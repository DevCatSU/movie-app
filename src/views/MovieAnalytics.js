import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Spinner } from "react-bootstrap";
import { API_KEY, API_BASE_URL } from '../config';

function MovieAnalytics() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [stats, setStats] = useState({
    avgRating: "0.0",
    totalVotes: "0",
    avgPopularity: "0"
  });

  useEffect(() => {
    const fetchRecentMovies = async () => {
      try {
        setLoading(true);
        
        const today = new Date();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(today.getMonth() - 6);
        
        const fromDate = sixMonthsAgo.toISOString().split('T')[0];
        const toDate = today.toISOString().split('T')[0];
        
        const response = await fetch(
          `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${fromDate}&primary_release_date.lte=${toDate}&vote_count.gte=50`
        );
        
        if (!response.ok) throw new Error("Failed to fetch movie data");
        
        const data = await response.json();
        const results = data.results || [];
        setMovies(results);
        
        if (results.length > 0) {
          const totalRating = results.reduce((sum, movie) => sum + movie.vote_average, 0);
          const totalVotes = results.reduce((sum, movie) => sum + movie.vote_count, 0);
          const totalPopularity = results.reduce((sum, movie) => sum + movie.popularity, 0);
          
          setStats({
            avgRating: (totalRating / results.length).toFixed(1),
            totalVotes: totalVotes.toLocaleString(),
            avgPopularity: Math.round(totalPopularity / results.length).toString()
          });
        }
      } catch (err) {
        console.error("Error fetching movie data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecentMovies();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container fluid className="sub">
      <Container>
        <Row>
          <h1>
            <strong>Box Office</strong> Stats
          </h1>
        </Row>
        <Row>
          <h2>
            Track performance metrics for top films
          </h2>
        </Row>
        
        <Row className="mb-4">
          <Col md={4} className="mb-3 mb-md-0">
            <Card className="stat-card">
              <Card.Body className="text-center">
                <Card.Title>Average Rating</Card.Title>
                <Card.Text className="stat-value">{stats.avgRating}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <Card className="stat-card">
              <Card.Body className="text-center">
                <Card.Title>Total Votes</Card.Title>
                <Card.Text className="stat-value">{stats.totalVotes}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="stat-card">
              <Card.Body className="text-center">
                <Card.Title>Avg Popularity</Card.Title>
                <Card.Text className="stat-value">{stats.avgPopularity}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row>
          <Col>
            {loading ? (
              <div className="text-center my-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Loading movie data...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <Table className="movie-table">
                  <thead>
                    <tr>
                      <th>Movie</th>
                      <th className="text-center">Avg. Rating</th>
                      <th className="text-center">Votes</th>
                      <th className="text-center">Popularity</th>
                      <th className="text-center">Release Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movies.map(movie => (
                      <tr key={movie.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            {movie.title}
                          </div>
                        </td>
                        <td className="text-center">{movie.vote_average.toFixed(1)}</td>
                        <td className="text-center">{movie.vote_count.toLocaleString()}</td>
                        <td className="text-center">{Math.round(movie.popularity)}</td>
                        <td className="text-center">{formatDate(movie.release_date)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default MovieAnalytics;
