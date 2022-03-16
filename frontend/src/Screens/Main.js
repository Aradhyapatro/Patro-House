import "./Main.css";
import Item from "../Components/Item";
import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { listProduct } from "../Actions/ProductActions.js";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message.js";
import SpinnerCom from "../Components/SpinnerCom";

const Main = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { Loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);

  return (
    <>
      <Container>
        {Loading ? (
          <SpinnerCom></SpinnerCom>
        ) : error ? (
          <Message variant="danger" message={error}></Message>
        ) : (
          <Row>
            {products.map((product, index) => {
              return (
                <Col xl={3} lg={4} md={6} sm={12} key={index}>
                  <Item product={product} />
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </>
  );
};

export default Main;
