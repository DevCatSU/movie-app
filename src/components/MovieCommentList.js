import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

function MovieCommentList({ comments, onDelete, onEdit }) {
  const [editPasswords, setEditPasswords] = useState({});
  const [visiblePasswordId, setVisiblePasswordId] = useState(null);
  const [passwordErrors, setPasswordErrors] = useState({});
  const [editModes, setEditModes] = useState({});
  const [editedTexts, setEditedTexts] = useState({});

  // Change password
  const handlePasswordChange = (e, id) => {
    setEditPasswords({ ...editPasswords, [id]: e.target.value });
    setPasswordErrors({ ...passwordErrors, [id]: "" });
  };

  // Show password field
  const handleEditClick = (id) => {
    setVisiblePasswordId(id);
  };

  // Check password → enable edit
  const confirmEdit = (comment) => {
    if (editPasswords[comment.id] === comment.password) {
      setEditModes({ ...editModes, [comment.id]: true });
      setEditedTexts({ ...editedTexts, [comment.id]: comment.text });
    } else {
      setPasswordErrors({
        ...passwordErrors,
        [comment.id]: "Incorrect password",
      });
    }
  };

  // Check password → delete
  const handleDelete = (comment) => {
    if (editPasswords[comment.id] === comment.password) {
      onDelete(comment.id);
      setEditPasswords({ ...editPasswords, [comment.id]: "" });
      setVisiblePasswordId(null);
    } else {
      setPasswordErrors({
        ...passwordErrors,
        [comment.id]: "Incorrect password",
      });
    }
  };

  // Save edited text
  const saveEdit = (id) => {
    if (editedTexts[id].trim() !== "") {
      onEdit(id, editedTexts[id]);
      setEditModes({ ...editModes, [id]: false });
      setVisiblePasswordId(null);
    }
  };

  return (
    <div className="comment-list-wrapper mt-5">
      {comments.length === 0 ? (
        <p className="text-center text-muted">
          Still waiting for the first comment.
        </p>
      ) : (
        comments.map((comment) => (
          <Card key={comment.id} className="mb-4 comment-card">
            <Card.Body>
              {/* Top: name + time */}
              <div className="d-flex justify-content-between">
                <strong>{comment.nickname}</strong>
                <small className="text-muted">
                  {new Date(comment.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{new Date(comment.createdAt).toLocaleDateString()}
                </small>
              </div>

              {/* Text or Textarea */}
              {!editModes[comment.id] ? (
                <Card.Text className="mt-2">{comment.text}</Card.Text>
              ) : (
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editedTexts[comment.id]}
                  onChange={(e) =>
                    setEditedTexts({
                      ...editedTexts,
                      [comment.id]: e.target.value,
                    })
                  }
                  className="mb-2"
                />
              )}

              {/* Buttons & password */}
              <div className="comment-actions mt-3 justify-content-end">
                {visiblePasswordId === comment.id && (
                  <>
                    {passwordErrors[comment.id] && (
                      <span className="password-error me-2">
                        {passwordErrors[comment.id]}
                      </span>
                    )}
                    <Form.Control
                      type="password"
                      size="sm"
                      placeholder="Enter password"
                      className="me-2 password-input"
                      value={editPasswords[comment.id] || ""}
                      onChange={(e) => handlePasswordChange(e, comment.id)}
                    />
                  </>
                )}

                {/* Edit/Delete or Save/Cancel */}
                {!editModes[comment.id] ? (
                  <>
                    <Button
                      variant="danger"
                      size="sm"
                      className="btn btn-primary"
                      onClick={() =>
                        visiblePasswordId === comment.id
                          ? handleDelete(comment)
                          : handleEditClick(comment.id)
                      }
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outline-dark"
                      className="btn btn-primary"
                      size="sm"
                      onClick={() =>
                        visiblePasswordId === comment.id
                          ? confirmEdit(comment)
                          : handleEditClick(comment.id)
                      }
                    >
                      Edit
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      size="sm"
                      className="btn btn-primary"
                      onClick={() => saveEdit(comment.id)}
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        setEditModes({ ...editModes, [comment.id]: false })
                      }
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}

export default MovieCommentList;
