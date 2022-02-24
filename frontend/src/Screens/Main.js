import "./Main.css";
import axios from "axios";
import products from "../products";
import { Link } from "react-router-dom";
import Rating from "../Components/Rating";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Main = () => {
  const [prod, setProd] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get("/api/products");
      setProd(data);
      console.log(typeof prod);
    };

    fetch();
  }, []);

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
