// src/components/MovieCard.js
// Displays a single movie card using react-bootstrap components.
// Links image and title to the external TMDb movie page.
import React from 'react';
import { Card, Button, Stack } from 'react-bootstrap';
import { IMAGE_BASE_URL } from '../config'; // Ensure path is correct

const placeholderImage = 'https://via.placeholder.com/300x450?text=No+Image';

function MovieCard({ movie, onAdd, onRemove, onToggleWatched, isWatchlist = false }) {
  const handleAdd = () => onAdd && onAdd(movie);
  const handleRemove = () => onRemove && onRemove(movie.id);
  const handleToggleWatched = () => onToggleWatched && onToggleWatched(movie.id);

  const imageUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : placeholderImage;

  // Construct the external link URL to TMDb
  const tmdbUrl = `https://www.themoviedb.org/movie/${movie.id}`;

  // Style for watched state opacity
  const cardStyle = isWatchlist && movie.watched ? { opacity: 0.6, transition: 'opacity 0.3s ease' } : { transition: 'opacity 0.3s ease' };

  return (
    <Card className="h-100 bg-dark text-white border-secondary" style={cardStyle}>
      {/* Image is an external link */}
      <a href={tmdbUrl} target="_blank" rel="noopener noreferrer">
        <Card.Img
          variant="top"
          src={imageUrl}
          alt={movie.title || 'N/A'}
          onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
          style={{ aspectRatio: '2 / 3', objectFit: 'cover' }}
        />
      </a>
      <Card.Body className="d-flex flex-column">
        <div>
            {/* Title is also an external link */}
            <a href={tmdbUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card.Title as="h6" className="mb-1 text-truncate" title={movie.title || 'Title unavailable'}>
                  {movie.title || 'Title unavailable'}
                </Card.Title>
            </a>
            <Card.Text as="small" className="text-muted mb-2">
              {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
            </Card.Text>
        </div>

        {/* Action Buttons */}
        <Stack gap={2} className="mt-auto">
          {isWatchlist ? (
            <> {/* Use primary variant matching your style.css */}
              <Button variant="primary" size="sm" onClick={handleRemove}>Remove</Button>
              <Button variant="primary" size="sm" onClick={handleToggleWatched}>
                {movie.watched ? 'Mark Unwatched' : 'Mark Watched'}
              </Button>
            </>
          ) : (
            <Button
              variant="primary" // Use primary variant
              size="sm"
              onClick={handleAdd}
              disabled={!onAdd}
            >
              {onAdd ? 'Add to Watchlist' : 'In Watchlist'}
            </Button>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;