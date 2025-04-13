// src/App.js
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import About from "./views/About";
import Search from "./views/Search";
import WatchList from "./views/WatchList";
import MovieOfTheMonth from "./views/MovieOfTheMonth";
import BoxOffice from "./views/BoxOffice";
import MovieAnalytics from "./views/MovieAnalytics";
import GenreTrends from "./views/GenreTrends";
import ContactUs from "./views/ContactUs";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import "bootstrap/dist/css/bootstrap.min.css"; 
import "./assets/css/style.css";             
import "./App.css";                       
import "./assets/css/about.css";
import "./assets/css/search.css";
import "./assets/css/watch.css";
import "./assets/css/month.css";
import "./assets/css/box.css";
import "./assets/css/analytics.css";
import "./assets/css/genre.css";
import "./assets/css/contact.css";


function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />

        <main className="app-main-content">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/search" element={<Search />} />
                <Route path="/watchList" element={<WatchList />} />
                <Route path="/movieOfTheMonth" element={<MovieOfTheMonth />} />
                <Route path="/boxOffice" element={<BoxOffice />} />
                <Route path="/movieAnalytics" element={<MovieAnalytics />} />
                <Route path="/genreTrends" element={<GenreTrends />} />
                <Route path="/contactUs" element={<ContactUs />} />
            </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;