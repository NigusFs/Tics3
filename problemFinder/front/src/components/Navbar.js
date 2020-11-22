import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Logo from "../assests/logo.jpg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

function NavBarr() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <img
          src={Logo}
          width="55"
          height="55"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>

      <Nav className="mr-auto">
        <Nav.Link>
          {" "}
          <Link to="/">Home</Link>
        </Nav.Link>
        <Nav.Link>
          {" "}
          <Link to="/about">About</Link>
        </Nav.Link>
        <Nav.Link>
          {" "}
          <Link to="/list-problems">List Problems</Link>
        </Nav.Link>
        <Nav.Link>
          {" "}
          <Link to="/Login">Login</Link>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
// hay q mover las rutas a donde correspondan aqui esta todo y se ve feo
// movido a main
export default NavBarr;
