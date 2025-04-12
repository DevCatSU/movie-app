// src/components/MovieCard.js
// Displays a single movie with details and action buttons using react-bootstrap Card.
import React from 'react';
import { Card, Button, Stack } from 'react-bootstrap';
import { IMAGE_BASE_URL } from '../config'; // Base URL for movie poster images

const placeholderImage = 'https://via.placeholder.com/300x450?text=No+Image';

function MovieCard({ movie, onAdd, onRemove, onToggleWatched, isWatchlist = false }) {
  // Event handlers that call functions passed via props
  const handleAdd = () => onAdd && onAdd(movie);
  const handleRemove = () => onRemove && onRemove(movie.id);
  const handleToggleWatched = () => onToggleWatched && onToggleWatched(movie.id);

  // Construct image URL or use placeholder
  const imageUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : placeholderImage;

  // Apply style for 'watched' state if applicable
  const cardStyle = isWatchlist && movie.watched ? { opacity: 0.6, transition: 'opacity 0.3s ease' } : { transition: 'opacity 0.3s ease' };

  return (
    // Bootstrap Card component with dark theme classes and full height
    <Card className="h-100 bg-dark text-white border-secondary" style={cardStyle}>
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={movie.title || 'N/A'}
        onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }} // Fallback for broken images
        style={{ aspectRatio: '2 / 3', objectFit: 'cover' }} // Maintain poster aspect ratio
      />
      {/* Card body uses Flexbox to structure content */}
      <Card.Body className="d-flex flex-column">
        {/* Movie Title (truncated if long) */}
        <Card.Title as="h6" className="mb-1 text-truncate">
          {movie.title || 'Title unavailable'}
        </Card.Title>
        {/* Movie Release Year */}
        <Card.Text as="small" className="text-muted mb-2">
          {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
        </Card.Text>

        {/* Action buttons stacked vertically at the bottom */}
        <Stack gap={2} className="mt-auto">
          {isWatchlist ? (
            // Buttons shown when card is in the Watchlist view
            <>
              <Button variant="outline-danger" size="sm" onClick={handleRemove}>Remove</Button>
              <Button variant="outline-secondary" size="sm" onClick={handleToggleWatched}>
                {movie.watched ? 'Mark Unwatched' : 'Mark Watched'}
              </Button>
            </>
          ) : (
            // Button shown when card is in the Search view
            <Button
              variant="primary" // Uses Bootstrap primary color (customized via CSS/SCSS)
              size="sm"
              onClick={handleAdd}
              disabled={!onAdd} // Button is disabled if onAdd prop is null
            >
              {onAdd ? 'Add to Watchlist' : 'In Watchlist'} {/* Text changes based on disabled state */}
            </Button>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;