import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import moviePoster from "../assets/img/bestOffer.jpg";
import "../assets/css/month.css";
import { TbRating16Plus } from "react-icons/tb";

function MovieContent() {
  return (
    <Container className="movie-detail-wrapper">
      <Row className="align-items-stretch mb-4">
        {/* Poster */}
        <Col md={4}>
          <Image
            src={moviePoster}
            alt="Movie Poster"
            fluid
            className="movie-poster"
          />
        </Col>

        {/* Trailer */}
        <Col md={8}>
          <div className="ratio ratio-16x9 h-100">
            <iframe
              src="https://www.youtube.com/embed/riK-6emCvjQ?si"
              title="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </Col>
      </Row>

      <Row className="movie-text-section">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="movie-title">The Best Offer <TbRating16Plus color="#a012fd" /> </h3>
            <p className="movie-runtime">2013 · 2h 11m</p>
          </div>

          <p className="movie-subtitle">
            Original title: <strong>La migliore offerta</strong>
          </p>
          <hr />

          <p className="movie-description">
            Virgil Oldman, a wealthy art auctioneer, takes the help of a young
            artificer, Robert, to understand and woo Claire Ibbetson, a young
            heiress, who hires him to auction off an antique collection. Virgil
            Oldman, a wealthy art auctioneer, takes the help of a young
            artificer, Robert, to understand and woo Claire Ibbetson, a young
            heiress, who hires him to auction off an antique collection.
          </p>
          <hr />
          <p className="movie-meta">
            <strong>Director</strong> Giuseppe Tornatore
          </p>
          <hr />
          <p className="movie-meta">
            <strong>Writer</strong> Giuseppe Tornatore
          </p>
          <hr />
          <p className="movie-meta">
            <strong>Stars</strong> Geoffrey Rush, Jim Sturgess, Sylvia Hoeks
          </p>
          <hr />
        </Col>
      </Row>
    </Container>
  );
}

export default MovieContent;
