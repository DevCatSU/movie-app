import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";

function NavBar() {
  const [expand, updateExpanded] = useState(false); // menu toggle
  const [navColour, updateNavbar] = useState(false); // scroll style

  // scroll event
  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  // change nav color on scroll
  function scrollHandler() {
    updateNavbar(window.scrollY >= 20);
  }

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="d-flex">
          <img src={logo} className="img-fluid logo" alt="brand" />
        </Navbar.Brand>

        {/* Toggle for mobile */}
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => updateExpanded(expand ? false : "expanded")}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>

        {/* Menu links */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="/">
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/about"
                onClick={() => updateExpanded(false)}
              >
                About Us
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/search"
                onClick={() => updateExpanded(false)}
              >
                Search
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/watchList"
                onClick={() => updateExpanded(false)}
              >
                Watch List
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/movieOfTheMonth"
                onClick={() => updateExpanded(false)}
              >
                Movie of the Month
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/boxOffice"
                onClick={() => updateExpanded(false)}
              >
                Box Office
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/movieAnalytics"
                onClick={() => updateExpanded(false)}
              >
                Movie Analytics
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/genreTrends"
                onClick={() => updateExpanded(false)}
              >
                Genre Trends
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/contactUs"
                onClick={() => updateExpanded(false)}
              >
                Contact Us
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
