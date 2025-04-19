import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import {
  getWatchlistFromStorage,
  removeMovieFromStorage,
  toggleWatchedStatusInStorage
} from '../utils/localStorage';

function WatchList() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load watchlist from localStorage
  const loadWatchlist = useCallback(() => {
    setLoading(true);
    try {
      const storedWatchlist = getWatchlistFromStorage();
      setWatchlist(storedWatchlist);
    } catch (error) {
      console.error("Error loading watchlist:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Trigger loadWatchlist on component mount
  useEffect(() => {
    loadWatchlist();
  }, [loadWatchlist]);

  // Remove movie from watchlist
  const handleRemove = (movieId) => {
    removeMovieFromStorage(movieId);
    setWatchlist(prev => prev.filter(movie => movie.id !== movieId));
  };

  // Toggle movie watched status
  const handleToggleWatched = (movieId) => {
    toggleWatchedStatusInStorage(movieId);
    setWatchlist(prev =>
      prev.map(movie =>
        movie.id === movieId ? { ...movie, watched: !movie.watched } : movie
      )
    );
  };

  return (
    <Container fluid="lg" className="sub">
      <Row>
          <h1>
           Yours <strong>Watch List</strong>
          </h1>
      </Row>
      <Row>
          <h2>
          Here are the movies you have saved
          </h2>
      </Row>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="light" />
        </div>
      ) : watchlist.length === 0 ? (
        
        <Alert variant="secondary" className="text-center bg-dark text-white-50 border-secondary">
          Your watchlist is empty. Add movies from the search page!
        </Alert>
      ) : (
        // Render watchlist as a responsive grid
        <Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6} className="g-4">
          {watchlist.map(movie => (
            <Col key={movie.id} className="d-flex">
              <MovieCard
                movie={movie}
                onRemove={handleRemove}
                onToggleWatched={handleToggleWatched}
                isWatchlist={true}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default WatchList;