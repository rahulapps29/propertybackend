// Profiles.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Profiles.css";
import api from "../api/api";
import { BASE_URL } from "../api/api";
const API_BASE = BASE_URL;

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/profiles`)
      .then((res) => {
        setProfiles(res.data);
        setFiltered(res.data);
      })
      .catch(() => {
        setProfiles([]);
        setFiltered([]);
      });
  }, []);

  useEffect(() => {
    const handleSearch = (e) => {
      const query = e.detail.toLowerCase();
      const results = profiles.filter((p) =>
        (p.name || "").toLowerCase().includes(query)
      );
      setFiltered(results);
    };

    window.addEventListener("search-input", handleSearch);
    return () => window.removeEventListener("search-input", handleSearch);
  }, [profiles]);

  return (
    <div className="profile-list container mt-4">
      <h2 className="text-center mb-4">All Profiles</h2>
      <div className="row g-4">
        {filtered.map((profile, i) => (
          <div className="col-md-4" key={profile._id}>
            <ProfileCard profile={profile} id={i} />
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfileCard = ({ profile, id }) => {
  const { name, email, images = [] } = profile;

  return (
    <div className="book">
      {images.length > 0 && (
        <div
          id={`carousel-${id}`}
          className="carousel slide mb-3"
          data-bs-ride="false"
        >
          <div className="carousel-inner">
            {images.map((img, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={`${API_BASE}${img}`}
                  className="d-block w-100 carousel-img"
                  alt={`profile-${index}`}
                />
              </div>
            ))}
          </div>

          {images.length > 1 && (
            <>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#carousel-${id}`}
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target={`#carousel-${id}`}
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" />
                <span className="visually-hidden">Next</span>
              </button>
            </>
          )}
        </div>
      )}

      <h2>
        <Link to={`/profile/${profile._id}`} className="DetailLink">
          {name || "Not specified"}
        </Link>
      </h2>
    </div>
  );
};

export default Profiles;
