import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLogoutAction } from "../Actions/UserLoginActions.js";
import {
  Nav,
  Navbar,
  Container,
  NavDropdown,
  LinkContainer,
} from "react-bootstrap";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHander = () => {
    dispatch(userLogoutAction());
    console.log("Logout");
  };

  const profileView = () => {
    console.log("Profile");
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Patro-House</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/cart/">
                <i className="fa-solid fa-cart-shopping p-2"></i>Cart
              </Nav.Link>
              {userInfo !== [] ? (
                <NavDropdown id="username" title={userInfo.name}>
                  <NavDropdown.Item onClick={profileView}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHander}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href="/login">
                  <i className="fa-solid fa-user p-2"></i>Sign Up
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
