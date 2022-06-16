import React, { useEffect } from "react";
import Message from "../Components/Message.js";
import {
  Row,
  Col,
  Form,
  Image,
  Card,
  ListGroup,
  Button,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../Actions/CartActions.js";
import { useDispatch, useSelector } from "react-redux";

import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const productId = useParams().id;
  const [searchParams, setSearchParams] = useSearchParams();
  const quantity = searchParams.get("qty")
    ? Number(searchParams.get("qty"))
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    dispatch(addToCart(productId, quantity));
  }, [dispatch, productId, quantity]);

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const proceedToCheckOut = () => {
    navigator("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1 className="text-center margin">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message message={`There is no item in your Cart`}></Message>
        ) : (
          <ListGroup variant="flush" className="listGroup">
            {cartItems.map((Item) => {
              return (
                <ListGroup.Item key={Item.product}>
                  <Row>
                    <Col md={3}>
                      <Image
                        src={Item.image}
                        alt={Item.name}
                        fluid
                        rounded
                      ></Image>
                    </Col>
                    <Col md={3}>
                      <Link to={`/products/${Item.product}`}>{Item.name}</Link>
                    </Col>
                    <Col md={2}>₹{Item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={Item.qty}
                        onChange={(e) => {
                          dispatch(
                            addToCart(Item.product, Number(e.target.value))
                          );
                        }}
                      >
                        {[...Array(Item.countInStock).keys()].map((x) => {
                          return (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        onClick={() => {
                          removeItem(Item.product);
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
            <></>
          </ListGroup>
        )}
      </Col>
      <Col md={3}>
        <h1 className="text-center"> details</h1>
        <Card>
          <ListGroup className="margin" variant="flush">
            <ListGroup.Item>
              <h2>
                Sub-Total is (
                {cartItems.reduce((acc, curr) => acc + curr.qty, 0)})
              </h2>
              <h3>
                ₹
                {cartItems
                  .reduce((acc, curr) => acc + curr.qty * curr.price, 0)
                  .toFixed(2)}
              </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0 ? true : false}
                onClick={() => {
                  proceedToCheckOut();
                }}
              >
                Proceed to Checkout and payment
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
