import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Carousel from "../components/Carousel";
import ProjectCards from "../components/Projects";

function Home() {
  return (
    <section>
      <Container fluid className="hero" id="home">
        <Carousel />
      </Container>
      <ProjectCards />
    </section>
  );
}

export default Home;
