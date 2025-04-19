import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiOutlineTwitter, AiFillInstagram } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";

function Footer() {
  let date = new Date(); // Current date
  let year = date.getFullYear(); // Current year

  return (
    <Container fluid className="footer">
      <Row>
        {/* Left section */}
        <Col md="4" className="footer-copywright">
          <h3>Designed and Developed by Cineflex</h3>
        </Col>

        {/* Center section */}
        <Col md="4" className="footer-copywright">
          <h3>Copyright © {year} CINEFLEX</h3>
        </Col>

        {/* Right section (social icons) */}
        <Col md="4" className="footer-body">
          <ul className="footer-icons">
            {/* Twitter */}
            <li className="social-icons">
              <a
                href=""
                style={{ color: "white" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiOutlineTwitter />
              </a>
            </li>

            {/* Facebook */}
            <li className="social-icons">
              <a
                href=""
                style={{ color: "white" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
            </li>

            {/* Instagram */}
            <li className="social-icons">
              <a
                href=""
                style={{ color: "white" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillInstagram />
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
