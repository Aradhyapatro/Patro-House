import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import SpinnerCom from "../Components/SpinnerCom";
import { orderDeliverAction, orderDetailsAction, orderPayAction } from "../Actions/OrderActions";
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from "../Constants/OrderConstants";

const OrderButtonWrapper = (amount) => {
  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: { amount },
              },
            },
          ],
        });
      }}
    />
  );
};

const OrderScreen = () => {
  const orderId = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLog = useSelector((state) => state.userLogin);
  const { userInfo } = userLog;

  const orderDelivery = useSelector((state) => state.OrderDelivered);
  const { success: successDeliver, Loading: LoadingDeliver, error: errorDeliver } = orderDelivery;

  const orderPay = useSelector((state) => state.orderPay);

  const {
    success: successPay,
    loading: loadingPay,
    error: errorPay,
  } = orderDetails;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(3);
    };

    // calculate Prices
    order.itemsPrice = addDecimals(
      Number(
        order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      )
    );
  }

  const successHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(orderPayAction(orderId, paymentResult));
  };
  // let clientId;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    // const addScript = async () => {
    //   const { data } = await axios.get(
    //     "http://localhost:5000/api/config/paypal"
    //   );
    //   clientId = data.clientId;
    //   const script = document.createElement("script");
    //   script.type = "text/javascript";
    //   script.async = true;
    //   script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    //   setSdkReady(true);
    //   // document.appendChild(script)
    // };
    // addScript();

    if (!order || successPay || order._id !== orderId || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(orderDetailsAction(orderId));
    }
    // else if (!order.isPaid) {
    //   setSdkReady(true);
    // }

  }, [order, orderId, orderPay, successPay, successDeliver]);

  const handleApprove = (order) => {
    const paymentResult = {
      id: order.id,
      status: order.status,
      email_address: order.payer.email_address,
      update_time: order.update_time
    }
    console.log(paymentResult);
    dispatch(orderPayAction(orderId, paymentResult));
  }

  const deliverHandler = () => {
    dispatch(orderDeliverAction(orderId));
  }

  return loading ? (
    <SpinnerCom />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1 className="Text-Center">Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message
                  variant="success"
                  message="Delivered"
                  concat={order.deliveredAt}
                ></Message>
              ) : (
                <Message variant="danger" message="Not Delivered"></Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message
                  variant="success"
                  message="is paid"
                  concat={order.paidAt}
                ></Message>
              ) : (
                <Message variant="danger" message="not paid"></Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₹{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₹{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>₹{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₹{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <SpinnerCom></SpinnerCom>}
                  <PayPalScriptProvider>
                    <PayPalButtons
                      onClick={(data, actions) => {
                        const hasAlreadyBoughtCourse = false;
                        if (hasAlreadyBoughtCourse) {
                          return actions.reject();
                        } else {
                          return actions.resolve();
                        }
                      }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              description: order.items,
                              amount: {
                                value: order.totalPrice,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={async (data, action) => {
                        const order = await action.order.capture();
                        handleApprove(order);
                        console.log("Payment Done");
                      }}
                      onCancel={() => { }}
                      onError={(err) => {
                        console.log("PayPal Checkout onError", err);
                      }}
                    />
                  </PayPalScriptProvider>
                </ListGroup.Item >
              )}
            </ListGroup >
            {LoadingDeliver && <SpinnerCom></SpinnerCom>}
            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <ListGroup>
                <Button type="button" onClick={deliverHandler} className='btn btn-block'>
                  Mark as delivered
                </Button>
              </ListGroup>
            )}
          </Card >
        </Col >
      </Row >
    </>
  );
};

export default OrderScreen;
