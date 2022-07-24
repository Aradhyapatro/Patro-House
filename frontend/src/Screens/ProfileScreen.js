import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row, Spinner, Table } from "react-bootstrap";
import Message from "../Components/Message";
import { userDetailsAction, userUpdateAction } from "../Actions/UserActions";
import { useNavigate } from "react-router-dom";
import { orderListMyAction } from '../Actions/OrderActions';
import SpinnerCom from "../Components/SpinnerCom";
import { LinkContainer } from 'react-router-bootstrap';
import { USER_UPDATE_RESET } from '../Constants/UserConstants';

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

  const myOrders = useSelector((state) => state.myOrderList);
  const { Loading: LoadingOrders, error: errorOrders, order: ordersMy } = myOrders
  console.log(myOrders);


  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_RESET })
        dispatch(userDetailsAction("profile"));
        dispatch(orderListMyAction());
        console.log("Done");
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, dispatch, userInfo, user, success]);

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
    <Row >
      <Col md={3}>
        {success && (
          <Message
            variant="success"
            message="Your Changes are Up-to-date"
          ></Message>
        )}
        {error && <Message variant="danger" message={error}></Message>}
        {Loading && <Spinner />}
        <h1 className="Text-Center">User Profile</h1>
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
      <Col md={8}>
        <h2 className="Text-Center">My orders </h2>
        {
          LoadingOrders ?
            <SpinnerCom></SpinnerCom> : errorOrders ? <Message message={errorOrders}></Message> : (
              <Table>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>DATE</td>
                    <td>TOTAL</td>
                    <td>PAID</td>
                    <td>DELIVERED</td>
                  </tr>
                </thead>
                <tbody>
                  {ordersMy.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>{order.isPaid ? order.paidAt.substring(0, 10) : <i className="fas fa-times" style={{ color: "red" }}></i>}</td>
                      <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className="fas fa-times" style={{ color: "red" }}></i>}</td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button className="btn-sm" varient='light'>Details</Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))
                  }
                </tbody >
              </Table >
            )}
      </Col >
    </Row >
  );
};

export default ProfileScreen;
