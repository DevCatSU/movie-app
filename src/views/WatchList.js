// src/views/WatchList.js
// View component for displaying and managing the user's movie watchlist.
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import MovieCard from '../components/MovieCard'; // Card component for displaying each movie
import {
  getWatchlistFromStorage,
  removeMovieFromStorage,
  toggleWatchedStatusInStorage
} from '../utils/localStorage'; // Utilities for watchlist persistence

function WatchList() {
  // State variables for the watchlist component
  const [watchlist, setWatchlist] = useState([]); // Array of movies in the watchlist
  const [loading, setLoading] = useState(true); // Indicates if watchlist is being loaded

  // Loads the watchlist data from localStorage
  const loadWatchlist = useCallback(() => {
    setLoading(true);
    try {
        const storedWatchlist = getWatchlistFromStorage(); // Get data from storage
        setWatchlist(storedWatchlist); // Update component state
    } catch (error) {
        console.error("Error loading watchlist:", error);
        // Handle potential errors during loading (e.g., corrupted data)
    } finally {
        setLoading(false); // Reset loading state
    }
  }, []); // useCallback ensures function identity stability

  // Load the watchlist when the component mounts
  useEffect(() => {
    loadWatchlist();
  }, [loadWatchlist]); // Dependency array includes loadWatchlist

  // Removes a movie from the watchlist (updates localStorage and state)
  const handleRemove = (movieId) => {
    removeMovieFromStorage(movieId); // Remove from storage
    setWatchlist(prev => prev.filter(movie => movie.id !== movieId)); // Update state by filtering
  };

  // Toggles the 'watched' status of a movie (updates localStorage and state)
  const handleToggleWatched = (movieId) => {
    toggleWatchedStatusInStorage(movieId); // Toggle status in storage
    // Update state by mapping and flipping the 'watched' property for the specific movie
    setWatchlist(prev =>
      prev.map(movie =>
        movie.id === movieId ? { ...movie, watched: !movie.watched } : movie
      )
    );
  };

  return (
    // Main container for the watchlist view
    <Container fluid="lg" className="py-4">
      <h2 className="text-center mb-4 text-light">My Watchlist</h2>

      {/* Display loading indicator */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="light" />
        </div>
      // Display message if watchlist is empty
      ) : watchlist.length === 0 ? (
        <Alert variant="secondary" className="text-center bg-dark text-white-50 border-secondary">
          Your watchlist is empty. Add movies from the search page!
        </Alert>
      // Display the watchlist movie grid
      ) : (
        // Responsive grid using Bootstrap Row/Col
        <Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6} className="g-4">
          {watchlist.map(movie => (
            <Col key={movie.id} className="d-flex"> {/* d-flex helps align card heights */}
              <MovieCard
                movie={movie} // Movie object includes 'watched' status
                onRemove={handleRemove} // Pass remove handler
                onToggleWatched={handleToggleWatched} // Pass toggle watched handler
                isWatchlist={true} // Indicate card context IS watchlist
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default WatchList;