import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Form } from "react-bootstrap";
import { API_KEY, API_BASE_URL } from '../config';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function GenreTrends() {
  const [loading, setLoading] = useState(true);
  const [genresList, setGenresList] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [months, setMonths] = useState([]);

  const COLORS = [
    "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", 
    "#00C49F", "#FFBB28", "#FF8042", "#a012fd", "#d0211c"
  ];

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        if (!response.ok) throw new Error("Failed to fetch genres");
        
        const data = await response.json();
        setGenresList(data.genres || []);
        
        if (data.genres && data.genres.length > 0) {
          setSelectedGenres(data.genres.slice(0, 5).map(g => g.id));
        }
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const generateMonths = () => {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      
      const monthData = [];
      
      for (let i = 11; i >= 0; i--) {
        let monthIndex = currentMonth - i;
        let year = currentYear;
        
        if (monthIndex < 0) {
          monthIndex += 12;
          year -= 1;
        }
        
        monthData.push({
          month: monthNames[monthIndex],
          fullMonth: monthIndex + 1,
          year: year,
          label: `${monthNames[monthIndex]} ${year}`
        });
      }
      
      setMonths(monthData);
    };

    generateMonths();
  }, []);

  useEffect(() => {
    const fetchTrendData = async () => {
      if (selectedGenres.length === 0 || months.length === 0) return;
      
      setLoading(true);
      
      try {
        const genreData = {};
        
        for (const monthData of months) {
          const year = monthData.year;
          const month = monthData.fullMonth;
          const label = monthData.label;
          
          const lastDay = new Date(year, month, 0).getDate();
          const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
          const endDate = `${year}-${month.toString().padStart(2, '0')}-${lastDay}`;
          
          for (const genreId of selectedGenres) {
            const response = await fetch(
              `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&sort_by=popularity.desc`
            );
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const data = await response.json();
            
            if (!genreData[label]) genreData[label] = {};
            
            const genreName = genresList.find(g => g.id === genreId)?.name || `Genre ${genreId}`;
            genreData[label][genreName] = data.total_results || 0;
          }
        }
        
        const formattedData = months.map(monthData => {
          const monthLabel = monthData.label;
          const monthDataPoint = { month: monthData.month, fullLabel: monthLabel };
          
          selectedGenres.forEach(genreId => {
            const genreName = genresList.find(g => g.id === genreId)?.name || `Genre ${genreId}`;
            monthDataPoint[genreName] = genreData[monthLabel][genreName] || 0;
          });
          
          return monthDataPoint;
        });
        
        setTrendData(formattedData);
      } catch (err) {
        console.error("Failed to fetch trend data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendData();
  }, [selectedGenres, months, genresList]);

  const handleGenreChange = (event) => {
    const genreId = parseInt(event.target.value, 10);
    setSelectedGenres(prev => {
      if (event.target.checked) {
        return [...prev, genreId];
      } else {
        return prev.filter(id => id !== genreId);
      }
    });
  };

  return (
    <Container fluid className="sub">
      <Container>
        <Row>
          <h1>
            <strong>Genre</strong> Trends
          </h1>
        </Row>
        <Row>
          <h2>
            Explore how movie genres have evolved over the past year
          </h2>
        </Row>

        <Row className="mb-4">
          <Col>
            <Form.Label>Select Genres to Display (Max 5 recommended):</Form.Label>
            <div className="d-flex flex-wrap">
              {genresList.map((genre) => (
                <Form.Check
                  key={genre.id}
                  type="checkbox"
                  id={`genre-${genre.id}`}
                  label={genre.name}
                  value={genre.id}
                  checked={selectedGenres.includes(genre.id)}
                  onChange={handleGenreChange}
                  className="me-3 mb-2"
                />
              ))}
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            {loading ? (
              <div className="text-center my-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Loading trend data...</p>
              </div>
            ) : (
              <div className="chart-container bg-light p-3 rounded mb-5" style={{ height: "500px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={trendData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip labelFormatter={(value) => {
                      const dataPoint = trendData.find(item => item.month === value);
                      return dataPoint ? dataPoint.fullLabel : value;
                    }} />
                    <Legend />
                    {selectedGenres.map((genreId, index) => {
                      const genreName = genresList.find(g => g.id === genreId)?.name || `Genre ${genreId}`;
                      return (
                        <Line
                          key={genreId}
                          type="monotone"
                          dataKey={genreName}
                          stroke={COLORS[index % COLORS.length]}
                          activeDot={{ r: 8 }}
                          strokeWidth={2}
                        />
                      );
                    })}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </Col>
        </Row>

        <Row>
          <Col>
            <h3>Understanding Monthly Genre Trends</h3>
            <p>
              This visualisation shows the number of movies released in each selected genre over the past 12 months.
              The data reveals how audience preferences and industry focus have shifted across different
              genres throughout the year.
            </p>
            <p>
              You can customise the view by selecting different genres to compare. This helps identify
              patterns such as rising genres, declining categories, and seasonal genre popularity.
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default GenreTrends;
