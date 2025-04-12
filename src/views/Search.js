// src/views/Search.js
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { API_KEY, API_BASE_URL } from '../config'; 
import MovieCard from '../components/MovieCard'; 
import { addMovieToStorage, getWatchlistFromStorage } from '../utils/localStorage'; 
import '../assets/css/search.css';


const DEBOUNCE_DELAY = 500; 

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [watchlistIds, setWatchlistIds] = useState(() => {
      const watchlist = getWatchlistFromStorage();
      return new Set(watchlist.map(m => m.id));
  });
  const debounceTimerRef = useRef(null);

  // Fetches movies from API
  const searchMovies = useCallback(async (searchQuery) => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      setResults([]); setError(null); setLoading(false); return;
    }
    setLoading(true); setError(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(trimmedQuery)}&language=en-US&page=1&include_adult=false`
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      const validResults = data.results?.filter(movie => movie.id && movie.poster_path) || [];
      setResults(validResults);
      if (validResults.length === 0) {
        setError(`No movies found matching "${trimmedQuery}".`);
      }
    } catch (err) {
      console.error("Failed to fetch movies:", err);
      setError('Failed to fetch movies. Please check connection/API key.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [API_KEY]);

  // Debounced search handler
  const debouncedSearch = useCallback((nextQuery) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      searchMovies(nextQuery);
    }, DEBOUNCE_DELAY);
  }, [searchMovies]);

  // Handles input changes, updates state, triggers debounced search
  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  // Handles explicit form submission (Enter or button click)
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    searchMovies(query);
  };

  // Cleans up debounce timer on unmount
  useEffect(() => {
    return () => { if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current); };
  }, []);

  // Adds movie to watchlist
  const handleAddToWatchlist = (movie) => {
    const added = addMovieToStorage(movie);
    if (added) setWatchlistIds(prevIds => new Set(prevIds).add(movie.id));
  };

  // Dynamically set class based on whether the query has content
  const searchWrapperClass = `search-view-wrapper ${query.trim().length > 0 ? 'active-search' : ''}`;

  return (
    // Outer Bootstrap container - ensures flex properties for the wrapper
    <Container fluid="lg" className="py-4 d-flex flex-grow-1">

      {/* This wrapper controls the centering/top alignment animation */}
      <div className={searchWrapperClass}>

        {/* Guiding text */}
        <h4 className="text-center my-custom-purple-text mb-4 fw-semibold search-heading">
          Find the movie you're interested in
        </h4>

        {/* Search Form */}
        <Form onSubmit={handleSearchSubmit} className="search-form mb-4 mx-auto">
          <Row className="g-2">
            <Col>
              <Form.Control
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Enter movie title"
                aria-label="Search for movies"
                className="bg-dark text-white border-secondary"
                autoFocus
              />
            </Col>
            <Col xs="auto">
              <Button variant="primary" type="submit" disabled={loading && query.trim().length > 0}>
                {loading && query.trim().length > 0 ? <Spinner as="span" animation="border" size="sm" /> : 'Search'}
              </Button>
            </Col>
          </Row>
        </Form>

        {/* Area for displaying results, loading, and error messages */}
        <div className="search-results-area">
          {/* Loading Indicator */}
          {loading && query.trim().length > 0 && (
            <div className="text-center mt-4">
              <Spinner animation="border" variant="light" />
            </div>
          )}

          {/* Error Message */}
          {!loading && error && (
            <Alert variant="danger" className="text-center mt-4">{error}</Alert>
          )}

          {/* Results Grid */}
          {!loading && results.length > 0 && (
            <Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6} className="g-4 mt-3">
              {results.map(movie => (
                <Col key={movie.id} className="d-flex">
                  <MovieCard
                    movie={movie}
                    onAdd={!watchlistIds.has(movie.id) ? handleAddToWatchlist : null}
                    isWatchlist={false}
                  />
                </Col>
              ))}
            </Row>
          )}

          {/* No Results Alert */}
          {!loading && !error && results.length === 0 && query.trim().length > 0 && (
            <Alert variant="secondary" className="text-center mt-4 bg-dark text-white-50 border-secondary">
              No movies found matching "{query.trim()}".
            </Alert>
          )}
        </div> 

      </div> 
    </Container>
  );
}

export default Search;