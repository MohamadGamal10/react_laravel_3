import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

function Header() {
  // function handleLogout(){
  //   window.localStorage.removeItem('email');
  //   window.location.pathname = "/";
  // }

  const cookie = new Cookies();
  const tokenCookie = cookie.get("Bearer");

  function handleLogout(){
    axios.post('http://127.0.0.1:8000/api/logout', null , {
      headers: {
        Authorization: `Bearer ${tokenCookie}`,
        Accept: "application/json"
      }
    });

    cookie.remove("Bearer");
    window.location.pathname = "/";
  }

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Nageeb3</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="ms-auto">
            {tokenCookie ? (
              <>
                <Link to="/dashboard" className="me-2 btn btn-info">
                  Dashboard
                </Link>
                <Button onClick={handleLogout} className="btn btn-danger">Log Out</Button>
              </>
            ) : (
              <>
                <Link to="/register" className="me-2 btn btn-success">
                  Register
                </Link>
                <Link to="/login" className="me-2 btn btn-primary">
                  Log in
                </Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
