import React, { useState, useEffect } from "react";
import Rating from "../Components/Rating";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SpinnerCom from "../Components/SpinnerCom";
import Message from "../Components/Message";
import { productDetails } from "../Actions/ProductDetailsActions.js";
import {
  Image,
  Row,
  Col,
  Button,
  ListGroup,
  Container,
  Form,
} from "react-bootstrap";

const Product = () => {
  let url = useParams();
  url = url.id;
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const productDetail = useSelector((state) => state.productDetail);
  const { Loading, error, product } = productDetail;
  const item = product;

  useEffect(() => {
    dispatch(productDetails(url));
  }, [dispatch, url]);

  const [qty, setQty] = useState(0);

  const addToCart = () => {
    navigator(`/cart/${url}?qty=${qty}`);
  };

  return (
    <React.Fragment>
      {Loading ? (
        <SpinnerCom></SpinnerCom>
      ) : error ? (
        <Message variant="danger" message={error}></Message>
      ) : (
        <Container>
          <Link to="/" style={{ all: "unset", cursor: "pointer" }}>
            <p className="btn btn-light my-3">Go Back</p>
          </Link>
          <Row>
            <Col md={6}>
              <Image
                src={item.image}
                alt={item.name}
                className="img-fluid"
              ></Image>
            </Col>

            {/* details */}
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>{item.name}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong className="my-auto">{item.brand} Branded</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    review={item.numReviews}
                    rating={item.rating}
                  ></Rating>
                </ListGroup.Item>
                <ListGroup.Item>₹{item.price}</ListGroup.Item>
                <ListGroup.Item>
                  <p>{item.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            {/* Add to Cart and Payment */}
            <Col md={3}>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h5>Price :</h5>
                    </Col>
                    <Col>
                      <h5 className="text-center">{item.price}</h5>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h6>Quantity :</h6>
                    </Col>
                    <Col>
                      <h6>{item.countInStock}</h6>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {item.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => {
                            setQty(e.target.value);
                          }}
                        >
                          {[...Array(item.countInStock).keys()].map((x) => {
                            return (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <div className="d-grid gap-2">
                    <Button
                      className="btn-lg"
                      onClick={() => {
                        addToCart();
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      )}
    </React.Fragment>
  );
};

export default Product;
