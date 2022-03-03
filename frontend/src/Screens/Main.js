import "./Main.css";
import axios from "axios";
// import products from "../products";
import Item from "../Components/Item";
import { Link } from "react-router-dom";
import Rating from "../Components/Rating";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Main = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetch() {
      const { data } = await axios.get("http://localhost:5000/api/products");
      console.log(data);
      setProducts(data);
    }
    fetch();
  }, []);

  return (
    <>
      <Container>
        <Row>
          {products.map((product, index) => {
            return (
              <Col xl={3} lg={4} md={6} sm={12} key={index}>
                <Item product={product} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Main;
