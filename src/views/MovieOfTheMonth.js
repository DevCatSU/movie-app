import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MovieContent from "../components/MovieContent";

function MovieOfTheMonth() {
  return (
    <Container fluid className="sub">
      <Container>
        <Row>
          <h1>
            <strong>Movie</strong> of the Month
          </h1>
        </Row>
        <Row>
          <h2>The most highly recommended movie of the month according to film critics.</h2>
        </Row>
        <Row>
          <MovieContent />
        </Row>
      </Container>
    </Container>
  );
}

export default MovieOfTheMonth;
