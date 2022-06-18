import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import Message from "../Components/Message";
import { userDetailsAction, userUpdateAction } from "../Actions/UserActions";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { Loading, user, error } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name) {
        dispatch(userDetailsAction("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, dispatch, userInfo, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("passwords don't match");
    } else {
      // update the profile
      dispatch(userUpdateAction({ id: user._id, name, email, password }));
      dispatch(userDetailsAction("profile"));
    }
  };

  return (
    <Row>
      <Col md={3}>
        {success && (
          <Message
            variant="success"
            message="Your Changes are Up-to-date"
          ></Message>
        )}
        {error && <Message variant="danger" message={error}></Message>}
        {Loading && <Spinner />}
        <h1>User Profile</h1>
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
      </Col>
      <Col md={9}>
        <h2>My orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
