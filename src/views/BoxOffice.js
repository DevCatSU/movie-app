import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Rank from "../components/Rank";

function BoxOffice() {
  return (
    <Container fluid className="sub">
      <Container>
        <Row>
          <h1>
            <strong>Box</strong> Office
          </h1>
        </Row>
        <Row>
          <h2>Discover which movies are in the spotlight right now.</h2>
        </Row>
        <Row>
          <Rank />
        </Row>
      </Container>
    </Container>
  );
}

export default BoxOffice;
