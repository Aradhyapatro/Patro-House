import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { Card } from "react-bootstrap";

const Item = ({ product }) => {
  return (
    <>
      <Card key={product._id} className="m-3 card">
        <Link to={`products/${product._id}`}>
          <Card.Img
            src={product.image}
            className="img-fluid"
            alt={product.name}
            variant="top"
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
    </>
  );
};

export default Item;
