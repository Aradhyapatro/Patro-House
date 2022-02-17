import React from "react";
import "./Main.css";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import products from "../products";
import Rating from "../Components/Rating";

const Main = () => {
  return (
    <Container>
      <Row>
        {products.map((product) => {
          return (
            <Col className="col-md-6 col-lg-4">
              <Card key={product._id} className="m-3 card">
                <Link to={`/products/${product._id}`}>
                  <Card.Img
                    src={`./${product.image}`}
                    className="img-fluid"
                    alt={product.name}
                  ></Card.Img>
                </Link>
                <Card.Body>
                  <Link to={`/${product._id}`} style={{ all: "unset" }}>
                    <Card.Title>{product.name}</Card.Title>
                  </Link>

                  <Rating
                    rating={product.rating}
                    review={product.numReviews}
                    color="red"
                  />
                  <Card.Text>
                    <h4> ₹{product.price}</h4>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Main;
