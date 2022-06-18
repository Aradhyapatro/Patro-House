import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../Components/FormContainer";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../Actions/CartActions";
import CheckoutSteps from "../Components/checkoutSteps";

const ShippingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <>
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Address"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              value={address}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="city"
              onChange={(e) => {
                setCity(e.target.value);
              }}
              value={city}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Postal"
              onChange={(e) => {
                setPostalCode(e.target.value);
              }}
              value={postalCode}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>country</Form.Label>
            <Form.Control
              type="text"
              placeholder="countrys"
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              value={country}
            ></Form.Control>
          </Form.Group>

          <Button variant="primary" type="Submit">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
