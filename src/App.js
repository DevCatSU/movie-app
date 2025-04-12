// src/App.js
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import About from "./views/About";
import Search from "./views/Search";
import WatchList from "./views/WatchList";
import MovieOfTheMonth from "./views/MovieOfTheMonth";
import BoxOffice from "./views/BoxOffice";
import CemMenu1 from "./views/CemMenu1";
import CemMenu2 from "./views/CemMenu2";
import ContactUs from "./views/ContactUs";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./assets/css/style.css"; // Your main style.css
import "./App.css";             // Your App.css (with sticky footer rules added)
import "./assets/css/about.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
      {/* The .App class now gets flexbox styles from App.css */}
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />

        {/* Wrap Routes in main tag with the specified class */}
        <main className="app-main-content">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/search" element={<Search />} />
                <Route path="/watchList" element={<WatchList />} />
                <Route path="/movieOfTheMonth" element={<MovieOfTheMonth />} />
                <Route path="/boxOffice" element={<BoxOffice />} />
                <Route path="/cemMenu1" element={<CemMenu1 />} />
                <Route path="/cemMenu2" element={<CemMenu2 />} />
                <Route path="/contactUs" element={<ContactUs />} />
            </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;