import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { IoTicket } from "react-icons/io5";

function ProjectCards(props) {
  return (
    <Card className="project-card-view">
      {/* Image */}
      <Card.Img variant="top" src={props.imgPath} alt="card-img" />

      <Card.Body>
        {/* Title */}
        <Card.Title>{props.title}</Card.Title>

        {/* Description */}
        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>

        {/* Ticket Button (if link exists) */}
        {props.ticketLink && (
          <Button
            variant="primary"
            href={props.ticketLink}
            target="_blank"
            rel="noreferrer"
            style={{ marginTop: "10px" }}
          >
            <IoTicket /> &nbsp; Buy Tickets
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;
