import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalButton } from 'react-paypal-button-v2';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import SpinnerCom from "../Components/SpinnerCom";
import { orderDetailsAction, orderPayAction } from "../Actions/OrderActions";
import { ORDER_PAY_RESET } from "../Constants/OrderConstants";

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

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

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
  let clientId;

  useEffect(() => {
    const addScript = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/config/paypal"
      );
      clientId = data.clientId;
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    addScript();

    if (!order || successPay || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(orderDetailsAction(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [order, orderId, successPay]);

  const onSuccessPayment = (paymentResult) => {
    console.log("payment = ", paymentResult);
    dispatch(orderPayAction(orderId, paymentResult));
    console.log("Done");
  };

  return loading ? (
    <SpinnerCom />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
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
                  <PayPalButton
                    options={{
                      clientId: clientId,
                      currency: "USD",
                    }}
                    amount={order.totalPrice}
                    onSuccess={(details, data) => {
                      alert("Transaction completed by " + details.payer.name.given_name);

                      console.log({ details, data });
                    }}
                  />
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <SpinnerCom></SpinnerCom>}
                  {!sdkReady ? (
                    <SpinnerCom></SpinnerCom>
                  ) : (
                    <PayPalButton
                      options={{
                        clientId: clientId,
                        currency: "USD",
                      }}
                      amount={order.totalPrice}
                      onSuccess={(details, data) => {
                        alert("Transaction completed by " + details.payer.name.given_name);

                        console.log({ details, data });
                      }}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;