const WATCHLIST_KEY = 'reactMovieAppWatchlist';

// Gets the watchlist (array of movie objects) from localStorage
export const getWatchlistFromStorage = () => {
  const watchlistJson = localStorage.getItem(WATCHLIST_KEY);
  return watchlistJson ? JSON.parse(watchlistJson) : [];
};

// Saves the watchlist (array of movie objects) to localStorage
export const saveWatchlistToStorage = (watchlist) => {
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
};

// Adds a movie to the watchlist
export const addMovieToStorage = (movie) => {
  const watchlist = getWatchlistFromStorage();
  // Prevent duplicates
  if (!watchlist.some(item => item.id === movie.id)) {
    const movieToAdd = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        watched: false // Initialize watched status
    };
    saveWatchlistToStorage([...watchlist, movieToAdd]);
    return true; // Indicate success
  }
  return false; // Indicate duplicate
};

// Removes a movie from the watchlist by ID
export const removeMovieFromStorage = (movieId) => {
  const watchlist = getWatchlistFromStorage();
  const updatedWatchlist = watchlist.filter(movie => movie.id !== movieId);
  saveWatchlistToStorage(updatedWatchlist);
};

// Toggles the 'watched' status of a movie in the watchlist
export const toggleWatchedStatusInStorage = (movieId) => {
  const watchlist = getWatchlistFromStorage();
  const updatedWatchlist = watchlist.map(movie =>
    movie.id === movieId ? { ...movie, watched: !movie.watched } : movie
  );
  saveWatchlistToStorage(updatedWatchlist);
};