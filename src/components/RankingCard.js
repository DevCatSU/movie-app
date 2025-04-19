import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { BsFillTrophyFill } from "react-icons/bs";

const API_KEY = "fed0305e690481383c6ef53ad4a279bf";

function RankingCard({ movie, rank }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setDetails(data);
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
      }
    };
    fetchDetails();
  }, [movie.id]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2 >= 1;

    for (let i = 0; i < fullStars; i++)
      stars.push(<span key={"full" + i}>★</span>);
    if (halfStar) stars.push(<span key="half">☆</span>);
    while (stars.length < 5)
      stars.push(<span key={"empty" + stars.length}>✩</span>);
    return stars;
  };

  const genreNames = details?.genres?.map((g) => g.name).join(", ");
  const runtime = details?.runtime ? `${details.runtime} min` : null;

  return (
    <Card className="mb-3 p-3 shadow-sm">
      <Row>
        {/* Poster */}
        <Col md={2} xs={3} className="poster-container position-relative">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                : "https://via.placeholder.com/100x150?text=No+Image"
            }
            alt={movie.title}
            className="img-fluid rounded"
          />
          <div className="rank-badge">{rank}</div>
        </Col>

        {/* Info */}
        <Col md={10} xs={9}>
          <div className="d-flex justify-content-between rating">
            <h3 className="fw-bold">
              {movie.title}
              {rank === 1 && (
                <BsFillTrophyFill color="gold" style={{ marginLeft: "8px" }} />
              )}
            </h3>
            <div className="text-end text-warning">
              {renderStars(movie.vote_average)}{" "}
              <span className="text-muted">
                ({movie.vote_average.toFixed(1)} / 10)
              </span>
            </div>
          </div>

          <ul className="movie-meta-list">
            <li>
              <span className="label">Release Date:</span>{" "}
              {movie.release_date || "N/A"}
            </li>
            {details && (
              <>
                <li>
                  <span className="label">Genres:</span> {genreNames || "N/A"}
                </li>
                <li>
                  <span className="label">Runtime:</span> {runtime || "N/A"}
                </li>
              </>
            )}
          </ul>

          <div className="text-body mt-2">
            {movie.overview
              ? movie.overview.length > 400
                ? movie.overview.slice(0, 400) + "..."
                : movie.overview
              : "No description available."}
          </div>
        </Col>
      </Row>
    </Card>
  );
}

export default RankingCard;
