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

  // Fetch movies from API
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

  // Debounce search input
  const debouncedSearch = useCallback((nextQuery) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      searchMovies(nextQuery);
    }, DEBOUNCE_DELAY);
  }, [searchMovies]);

  // Handle search input change
  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  // Handle form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    searchMovies(query);
  };

  // Clean up debounce timer on unmount
  useEffect(() => {
    return () => { if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current); };
  }, []);

  // Add movie to watchlist
  const handleAddToWatchlist = (movie) => {
    const added = addMovieToStorage(movie);
    if (added) setWatchlistIds(prevIds => new Set(prevIds).add(movie.id));
  };

  const searchWrapperClass = `search-view-wrapper ${query.trim().length > 0 ? 'active-search' : ''}`;

  return (
    <Container fluid="lg" className="sub d-flex flex-grow-1">
      <div className={searchWrapperClass}>
      <Row>
          <h1>
            <strong>Search</strong> the Movie
          </h1>
        </Row>
        <Row>
          <h2>
            Find the Movie you are interested in
          </h2>
        </Row>
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
        <div className="search-results-area">
          {loading && query.trim().length > 0 && (
            <div className="text-center mt-4">
              <Spinner animation="border" variant="light" />
            </div>
          )}
          {!loading && error && (
            <Alert variant="danger" className="text-center mt-4">{error}</Alert>
          )}
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