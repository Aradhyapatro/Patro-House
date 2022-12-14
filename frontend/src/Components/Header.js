import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLogoutAction } from "../Actions/UserActions.js";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import SearchBox from './SearchBox';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const logoutHander = () => {
    dispatch(userLogoutAction());
  };

  const profileView = () => {
    console.log("Profile");
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Patro-House</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox></SearchBox>
            <Nav className="ms-auto">
              <Nav.Link href="/cart">
                <i className="fa-solid fa-cart-shopping p-2"></i>Cart
              </Nav.Link>

              {userInfo ? (
                <NavDropdown id="username" title={userInfo.name}>
                  <NavDropdown.Item href="/profile" onClick={profileView}>
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
              {userInfo && userInfo.isAdmin &&
                <NavDropdown id="adminmenu" title="Admin">
                  <NavDropdown.Item href="/admin/usersList">
                    UsersList
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/productsList">
                    ProductsList
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/ordersList">
                    OrdersList
                  </NavDropdown.Item>
                </NavDropdown>
              }
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
