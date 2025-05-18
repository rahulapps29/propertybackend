import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import NewProfile from "./pages/ManageProfile.jsx";
import Profiles from "./components/Profiles.jsx";
import ProfileDetail from "./pages/ProfileDetail.jsx";

const App = () => {
  const location = useLocation();

  return (
    <div className="app">
      <nav className="navbar bg-light px-4 py-3">
        {/* First Row: Brand */}
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <Link
              to="/"
              className="fs-4 fw-bold text-dark text-decoration-none"
            >
              ProfileGallery
            </Link>
          </div>
        </div>

        {/* Second Row: Links + Search */}
        <div className="d-flex flex-wrap align-items-center gap-3 mt-3">
          {location.pathname !== "/" && (
            <Link
              to="/"
              className="nav-links text-decoration-none text-primary fw-medium"
            >
              Profiles
            </Link>
          )}

          {location.pathname !== "/new" && (
            <Link
              to="/new"
              className="nav-links text-decoration-none text-primary fw-medium"
            >
              Add/Edit Profile
            </Link>
          )}

          {location.pathname === "/" && (
            <input
              type="text"
              placeholder="Search profiles..."
              className="form-control"
              id="searchInput"
              style={{ width: "250px" }}
              onChange={(e) =>
                window.dispatchEvent(
                  new CustomEvent("search-input", { detail: e.target.value })
                )
              }
            />
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Profiles />} />
        <Route path="/new" element={<NewProfile />} />
        <Route path="/profile/:id" element={<ProfileDetail />} />
      </Routes>
    </div>
  );
};

export default App;
