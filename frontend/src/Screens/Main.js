import React from "react";
import "./Main.css";
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
                <Image src={`./${product.image}`} alt={product.name}></Image>
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Rating
                    rating={product.rating}
                    review={product.numReviews}
                    color="red"
                  />
                  <Card.Text>
                    <h4> ${product.price}</h4>
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
