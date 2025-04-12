import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import monster from "../assets/img/monster.webp";
import fran from "../assets/img/fran.webp";
import pride from "../assets/img/pride.webp";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Container>
        <h1>
          <strong>Top 3 </strong>Movies
        </h1>
        <h2>
          Discover the Top 3 hottest new releases. <br />
          The most talked-about movies everyone’s watching right now.
        </h2>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={monster}
              isBlog={false}
              title="Monster House"
              description="A thrilling animated adventure where a group of kids uncover the chilling secrets of a haunted house in their neighborhood. Built with suspenseful storytelling and mystery in one unforgettable experience."
              ticketLink="https://www.lighthousecinema.ie/film/staff-pick-monster-house"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={fran}
              isBlog={false}
              title="Fran the Man"
              description="A quirky and heartwarming indie drama that follows Fran’s journey through self-discovery, friendship, and second chances. Developed with emotional storytelling, and moments of light humor that resonate with real life."
              ticketLink="https://www.lighthousecinema.ie/film/fran-the-man"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={pride}
              isBlog={false}
              title="Pride & Prejudice"
              description="A timeless romantic drama adapted from Jane Austen’s classic novel. Crafted with stunning visuals, rich dialogue, and brilliant performances, it explores love, class with elegance and emotional depth."
              ticketLink="https://www.lighthousecinema.ie/film/pride-prejudice"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
