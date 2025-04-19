import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ContactForm from "../components/ContactForm";

function contactUs() {
  return (
    <Container fluid className="sub">
      <Container>
        <Row>
          <h1>
            <strong>Contact</strong> Us
          </h1>
        </Row>
        <h2>
          Have questions, feedback, or just want to say hello? We’d love to hear
          from you. <br />
          Fill out the form below and we’ll get back to you as soon as possible.
        </h2>
        <Row>
          <ContactForm />
        </Row>
      </Container>
    </Container>
  );
}

export default contactUs;
