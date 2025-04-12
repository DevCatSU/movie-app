import React, { useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.firstName) newErrors.firstName = "*First Name is required.";
    if (!formData.lastName) newErrors.lastName = "*Last Name is required.";
    if (!formData.email) {
      newErrors.email = "*Email is required.";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        newErrors.email = "*Please enter a valid email address.";
      }
    }
    if (!formData.message) newErrors.message = "*Message is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
  };

  return (
    <div className="contact-form">
      <Form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formFirstName" className="mb-3">
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formLastName" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formMessage" className="mb-3">
          <Form.Control
            as="textarea"
            rows={6}
            placeholder="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            isInvalid={!!errors.message}
          />
          <Form.Control.Feedback type="invalid">
            {errors.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>

        {submitted && (
          <p className="success-message">Message sent successfully!</p>
        )}
      </Form>
    </div>
  );
}

export default ContactForm;
