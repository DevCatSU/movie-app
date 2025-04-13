import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { BsChatSquareHeartFill } from "react-icons/bs";

function MovieCommentForm({ onAddComment }) {
  // State
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");

  const [errors, setErrors] = useState({
    nickname: "",
    password: "",
    text: "",
  });

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!nickname.trim()) newErrors.nickname = "Nickname is required.";
    if (!password.trim()) newErrors.password = "Password is required.";
    if (!text.trim()) newErrors.text = "Comment is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // New comment
    const newComment = {
      id: Date.now(),
      nickname,
      password,
      text,
      createdAt: new Date().toISOString(),
    };

    onAddComment(newComment);

    // Reset
    setNickname("");
    setPassword("");
    setText("");
    setErrors({});
  };

  return (
    <div className="comment-form-wrapper">
      <Form onSubmit={handleSubmit}>
        {/* Name & Password Row */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            {errors.nickname && (
              <div className="error-message">{errors.nickname}</div>
            )}
          </Col>
          <Col md={6}>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </Col>
        </Row>

        {/* Comment Textarea */}
        <Form.Group controlId="commentText" className="mb-3">
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Write your comment about movie"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {errors.text && <div className="error-message">{errors.text}</div>}
        </Form.Group>

        {/* Submit Button */}
        <div>
          <Button type="submit" className="btn btn-primary">
            <BsChatSquareHeartFill />
            &nbsp; Post &nbsp;
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default MovieCommentForm;
