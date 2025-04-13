import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import MovieCommentForm from "../components/MovieCommentForm";
import MovieCommentList from "../components/MovieCommentList";
import MovieContent from "../components/MovieContent";

function MovieOfTheMonth() {
  const [comments, setComments] = useState([]);

  // Load comments from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("movie-comments");
    if (stored) {
      setComments(JSON.parse(stored));
    }
  }, []);

  // Save comments to localStorage
  useEffect(() => {
    localStorage.setItem("movie-comments", JSON.stringify(comments));
  }, [comments]);

  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  const deleteComment = (id) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  const editComment = (id, newText) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, text: newText } : c))
    );
  };

  return (
    <Container fluid className="sub">
      <Container>
        <Row>
          <h1>
            <strong>Movie</strong> of the Month
          </h1>
        </Row>
        <Row>
          <h2 className="text-muted">
            The most highly recommended movie of the month according to film critics.
          </h2>
        </Row>
        <Row>
          <MovieContent />
        </Row>

        {/* comment */}
        <Row className="mt-5">
        <h3 className="movie-title">User reviews</h3>
          <MovieCommentForm onAddComment={addComment} />
          <MovieCommentList
            comments={comments}
            onDelete={deleteComment}
            onEdit={editComment}
          />
        </Row>
      </Container>
    </Container>
  );
}

export default MovieOfTheMonth;
