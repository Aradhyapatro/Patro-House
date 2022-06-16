import React, { useEffect, useState } from "react";
import Message from "../Components/Message.js";
import Spinner from "../Components/SpinnerCom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { userloginAction } from "../Actions/UserActions.js";
import FormContainer from "../Components/FormContainer.js";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchParam, setSearchParam] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { Loading, error, userInfo } = userLogin;

  const redirect = searchParam.get("redirect")
    ? searchParam.get("redirect").split("=")[1]
    : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(`${redirect}`);
    }
  }, [navigate, userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userloginAction(email, password));
  };

  return (
    <>
      {error && <Message variant="danger" message={error}></Message>}
      {Loading && <Spinner />}
      <FormContainer>
        <h1>Sign in</h1>
        <Form onSubmit={handleSubmit}>
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

          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            New Customer :
            <Link
              to={
                redirect !== "/" ? `register?redirect=${redirect}` : "/register"
              }
            >
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
