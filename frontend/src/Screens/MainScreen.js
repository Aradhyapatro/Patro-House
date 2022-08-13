import "./Main.css";
import Item from "../Components/Item";
import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { listProduct } from "../Actions/ProductActions.js";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message.js";
import SpinnerCom from "../Components/SpinnerCom";
import { useParams } from "react-router-dom";
import Paginate from '../Components/Paginate';
import Carousel from '../Components/ProductCarousel';
import Meta from "../Components/Meta";
import { Link } from "react-router-dom";

const Main = () => {
  const { keyword } = useParams();
  let { pageNumber } = useParams();
  const dispatch = useDispatch();
  console.log(pageNumber + "page");

  if (pageNumber == null) {
    pageNumber = 1;
  }

  const productList = useSelector((state) => state.productList);
  const { Loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProduct(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      <Container>
        {!keyword ? <Carousel></Carousel> : <>            <Link to="/" style={{ all: "unset", cursor: "pointer" }}>
          <p className="btn btn-light my-3">Go Back</p>
        </Link></>}
        <h1 className='Text-Center'>Products</h1>
        {Loading ? (
          <SpinnerCom></SpinnerCom>
        ) : error ? (
          <Message variant="danger" message={error}></Message>
        ) : (
          <div>
            <Row>
              {products.map((product, index) => {
                return (
                  <Col xl={3} lg={4} md={6} sm={12} key={index}>
                    <Item product={product} />
                  </Col>
                );
              })}
            </Row>
            asdasd
            {/* <Paginate page={3} pages={4} keyword={keyword ? keyword : ''} /> */}
          </div>
        )}
      </Container>
    </>
  );
};

export default Main;
