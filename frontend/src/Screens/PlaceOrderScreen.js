import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import CheckoutSteps from "../Components/checkoutSteps";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { orderCreateAction } from "../Actions/OrderActions";
import { useEffect } from "react";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(3);
  };

  // calculate Prices
  cart.itemsPrice = addDecimals(
    Number(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 1000 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.12 * cart.itemsPrice).toFixed(3)));
  cart.totalPrice =
    Number(cart.itemsPrice) +
    Number(cart.taxPrice) +
    Number(cart.shippingPrice);

  const orderData = useSelector((state) => state.orderCreated);
  const { order, success, error } = orderData;

  const placeOrederHandler = (e) => {
    dispatch(
      orderCreateAction({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, success]);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address : </strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode} ,{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>PaymentMethod</h2>
              <strong>Method:</strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message message="Your cart is empty"></Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          ></Image>
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = {item.price * item.qty}
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
                <Col>Item</Col>
                <Col>₹{cart.itemsPrice}</Col>
              </ListGroup.Item>
              <ListGroup.Item>
                <Col>Shipping </Col>
                <Col>₹{cart.shippingPrice}</Col>
              </ListGroup.Item>
              <ListGroup.Item>
                <Col>Tax</Col>
                <Col>₹{cart.taxPrice}</Col>
              </ListGroup.Item>
              <ListGroup.Item>
                <Col>Toal</Col>
                <Col>₹{cart.totalPrice}</Col>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant="danger" message={error}></Message>}
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrederHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
