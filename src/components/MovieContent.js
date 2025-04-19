import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import moviePoster from "../assets/img/bestOffer.jpg";
import { TbRating16Plus } from "react-icons/tb";

function MovieContent() {
  return (
    <Container className="movie-detail-wrapper">
      {/* Top layout */}
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
              src="https://www.youtube.com/embed/OAJ6UVNDt1E"
              title="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </Col>
      </Row>

      {/* Movie detail text */}
      <Row className="movie-text-section">
        <Col>
          {/* Title & runtime */}
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="movie-title">
              The Best Offer <TbRating16Plus color="#a012fd" />
            </h3>
            <p className="movie-runtime">2013 · 2h 11m</p>
          </div>

          {/* Subtitle */}
          <p className="movie-subtitle">
            Original title: <strong>La migliore offerta</strong>
          </p>
          <hr />

          {/* Description */}
          <p className="movie-description">
            The Best Offer is a hauntingly elegant psychological mystery that
            explores the fine line between authenticity and illusion—both in art
            and in human connection. Directed by Giuseppe Tornatore and anchored
            by a masterful performance from Geoffrey Rush, the film follows a
            reclusive art auctioneer who becomes entangled with a mysterious
            heiress. As their relationship unfolds, layers of deception and
            vulnerability are slowly revealed, blurring the boundaries between
            reality and fabrication. With its rich cinematography, an evocative
            score by Ennio Morricone, and a narrative that lingers like a
            half-remembered dream, The Best Offer is a beautifully crafted
            meditation on loneliness, obsession, and the fragile nature of
            trust.
          </p>
          <hr />

          {/* Director / Writer */}
          <p className="movie-meta">
            <strong>Director / Writer </strong>
            <a
              href="https://www.imdb.com/name/nm0868153/?ref_=tt_ov_dr_1"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Giuseppe Tornatore
            </a>
          </p>
          <hr />

          {/* Cast */}
          <p className="movie-meta">
            <strong>Stars </strong>
            <a
              href="https://www.imdb.com/name/nm0001691/?ref_=nv_sr_srsg_0_tt_6_nm_2_in_0_q_Geoffrey%2520Rush"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Geoffrey Rush
            </a>
            ,{" "}
            <a
              href="https://www.imdb.com/name/nm0836343/?ref_=fn_all_nme_1"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Jim Sturgess
            </a>
            ,{" "}
            <a
              href="https://www.imdb.com/name/nm1679778/?ref_=nv_sr_srsg_0_tt_0_nm_8_in_0_q_Sylvia%2520Hoeks"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Sylvia Hoeks
            </a>
          </p>
          <hr />

          {/* Genre */}
          <p className="movie-meta">
            <strong>Genre </strong>
            Mystery / Thriller, Drama, Romance, Art / Psychological Film
          </p>
          <hr />
        </Col>
      </Row>
    </Container>
  );
}

export default MovieContent;
