import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Aboutcard from "../components/AboutCard";
import laptopImg from "../assets/img/about.png";

function About() {
  return (
    <Container fluid className="sub">
      <Container>
        <Row className="about-row">
          <Col md={7} className="about-text">
            <h1 className="about-title">
              <strong>Know Who</strong> We Are
            </h1>
            <Aboutcard />
          </Col>
          <Col md={5} className="about-img-col about-img">
            <img src={laptopImg} alt="about" className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default About;
