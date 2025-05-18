import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import axios from "axios";
import NewProfile from "./pages/ManageProfile.jsx";
import Profiles from "./components/Profiles.jsx";
import ProfileDetail from "./pages/ProfileDetail.jsx"; // Add this
const App = () => {
  const location = useLocation();

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/" className="nav-links">
            {" "}
            ProfileGallery
          </Link>
        </div>

        <div className="nav-links">
          {location.pathname !== "/" && <Link to="/">Profiles</Link>}
          {location.pathname !== "/new" && (
            <Link to="/new">Add/Edit Profile</Link>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Profiles />} />
        <Route path="/new" element={<NewProfile />} />
        <Route path="/profile/:id" element={<ProfileDetail />} />{" "}
        {/* Add this */}
      </Routes>
    </div>
  );
};

export default App;
