import React, { useEffect } from "react";
import { Navbar, Nav, Container, Image, NavDropdown } from "react-bootstrap";
import "./NavStyle.css"
// import {Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GrCart } from 'react-icons/gr';
import { FaUserCircle } from 'react-icons/fa';
import { LinkContainer } from "react-router-bootstrap";
import { logoutUser } from "../actions/userAction";

const NavBar = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartReducer);
  const { cartItems } = cartState;
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;

  useEffect(() => {
    // to hide or show admin button for admin or user
    if (localStorage.getItem("currentUser") === null || !currentUser.isAdmin) {
      document.querySelector('.admin').style.display = 'none';
    }
  }, [currentUser]);
  return (
    <>
      <Navbar collapseOnSelect bg="light" variant="light" className="box">
        <Container fluid className="l-box" >

          <Navbar.Brand >
            <LinkContainer to="/">
              <NavDropdown.Item>
                <Image
                  className="img"
                  src="images/logo.jpg"
                  alt="PIZZA VILLAGE"

                />
              </NavDropdown.Item>
            </LinkContainer>
          </Navbar.Brand>
          {/* style={{float:"inline-start"}} */}

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              {currentUser ? (
                <LinkContainer to="/">
                
                  <NavDropdown className="drop" title={<FaUserCircle />} id="basic-nav-dropdown">
                    <NavDropdown.Item className="drop-item">{currentUser.name}</NavDropdown.Item><hr />
                    <LinkContainer to="/orders">
                      <NavDropdown.Item className="drop-item">orders</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item
                      className="drop-item"
                      onClick={() => {
                        dispatch(logoutUser());
                      }}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </LinkContainer>
              ) : (
                <>
                  {" "}
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>{" "}
                </>
              )}

              <LinkContainer to="/admin" className="admin">
                <Nav.Link>Admin</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/cart">
                <Nav.Link>
                  <div className="cartt">
                    <div> <GrCart /> </div>
                    <div className="count-icon">{cartItems.length}</div>
                  </div>
                </Nav.Link>
              </LinkContainer>


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
