import React, { useState, useEffect } from "react";
import Rating from "../Components/Rating";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SpinnerCom from "../Components/SpinnerCom";
import Message from "../Components/Message";
import { producCreateReviewAction } from '../Actions/ProductActions.js';
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
import { PRODUCT_CREATE_REVIEW_RESET } from '../Constants/ProductConstants';
import { Helmet } from "react-helmet";
import Meta from '../Components/Meta';

const Product = () => {
  let url = useParams();
  url = url.id;
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const productDetail = useSelector((state) => state.productDetail);
  const { Loading, error, product } = productDetail;
  const item = product;

  const productReview = useSelector((state) => state.ProductReviewCreate);
  const { Loading: LoadingReview, error: errorReview, success: successReview } = productReview;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [qty, setQty] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successReview === true) {
      console.log("here");
      alert('Your Review was added');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(productDetails(url));
  }, [dispatch, url, successReview]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(producCreateReviewAction(url, { rating, comment }))
  }

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
        <>
          <Container>
            <Meta title={item.name} description={item.description}></Meta>
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
            <Row>
              <Col md={6}>
                <h2>Reviews</h2>
                {item.reviews.length === 0 ? <Message message={'No Review Found For the Product'}></Message> : <>{
                  item.reviews.map(review => {
                    return <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating rating={review.rate}></Rating>
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  })
                }</>}

                <ListGroup.Item>
                  <h2>Write A Review</h2>
                  {errorReview && <Message message={errorReview}></Message>}
                  {userInfo ? <Form onSubmit={submitHandler}>
                    <Form.Group controlId='rating'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option value=''>Select...</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Fair</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='5'>5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group controlId='comment'>
                      <Form.Label>Comment</Form.Label>
                      {/* <Form.label>Comment</Form.label> */}
                      <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit">Submit</Button>
                  </Form> : <Message message={`Please Sign in to Write a Review`}></Message>}
                </ListGroup.Item>
              </Col>

            </Row>
          </Container >
        </>
      )
      }
    </React.Fragment >
  );
};

export default Product;
