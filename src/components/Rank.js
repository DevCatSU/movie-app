import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import RankingCard from "./RankingCard";

const API_KEY = "fed0305e690481383c6ef53ad4a279bf";

// Filter modes (Daily, Weekly, Monthly)
const filterModes = {
  daily: { type: "trending", time: "day" },
  weekly: { type: "trending", time: "week" },
  monthly: {
    type: "discover",
    sort: "popularity.desc",
    releaseDate: true,
  },
};

function Rank() {
  const [mode, setMode] = useState("daily"); // Default mode
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch movie data
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const config = filterModes[mode];
      let url = "";

      // Trending API
      if (config.type === "trending") {
        url = `https://api.themoviedb.org/3/trending/movie/${config.time}?api_key=${API_KEY}&language=en-US`;
      } 
      // Discover API
      else if (config.type === "discover") {
        const base = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${config.sort}`;
        if (config.releaseDate) {
          const now = new Date();
          const year = now.getFullYear();
          const month = String(now.getMonth() + 1).padStart(2, "0");
          const firstDay = `${year}-${month}-01`;
          const lastDay = `${year}-${month}-31`;
          url = `${base}&primary_release_date.gte=${firstDay}&primary_release_date.lte=${lastDay}`;
        } else {
          url = base;
        }
      }

      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  // Refetch when mode changes
  useEffect(() => {
    fetchMovies();
  }, [mode]);

  return (
    <div className="boxoffice-wrapper">
      {/* Filter buttons */}
      <div className="filter-bar wrap">
        <Button
          variant={mode === "daily" ? "dark" : "outline-dark"}
          onClick={() => setMode("daily")}
        >
          Daily
        </Button>
        <Button
          variant={mode === "weekly" ? "dark" : "outline-dark"}
          onClick={() => setMode("weekly")}
        >
          Weekly
        </Button>
        <Button
          variant={mode === "monthly" ? "dark" : "outline-dark"}
          onClick={() => setMode("monthly")}
        >
          Monthly
        </Button>
      </div>

      {/* Loading spinner or movie cards */}
      {loading ? (
        <div className="loading-spinner">
          <Spinner animation="border" variant="secondary" />
        </div>
      ) : (
        <div className="movie-list">
          {movies.slice(0, 20).map((movie, idx) => (
            <RankingCard key={movie.id} movie={movie} rank={idx + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Rank;
