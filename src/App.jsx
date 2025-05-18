import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import axios from "axios";
import NewProfile from "./pages/NewProfile.jsx";
import Profiles from "./components/Profiles.jsx";

const App = () => {
  const location = useLocation();

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">ProfileGallery</div>
        <div className="nav-links">
          {location.pathname !== "/" && <Link to="/">Profiles</Link>}
          {location.pathname !== "/new" && <Link to="/new">Add Profile</Link>}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Profiles />} />
        <Route path="/new" element={<NewProfile />} />
      </Routes>
    </div>
  );
};

export default App;
