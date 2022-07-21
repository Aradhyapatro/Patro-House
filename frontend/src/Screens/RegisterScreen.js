import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import FormContainer from "../Components/FormContainer";
import Message from "../Components/Message";
import { userRegisterAction } from "../Actions/UserActions";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParam, setSearchParam] = useSearchParams();
  const [message1, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const redirect = searchParam.get("redirect")
    ? searchParam.get("redirect")
    : "";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, Loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [redirect, userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("passwords don't match");
    } else {
      dispatch(userRegisterAction(name, email, password));
    }
  };

  return (
    <FormContainer>
      {message1 && <Message variant="danger" message={message1}></Message>}
      {error && <Message variant="danger" message={error}></Message>}
      {Loading && <Spinner />}
      <h1>Sign in</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>name</Form.Label>
          <Form.Control
            type="name"
            placeholder="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="confirm password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            value={confirmPassword}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Already Have a Account :
          <Link to={redirect !== "/" ? `login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
