import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./ProfileDetail.css";
const API_BASE = "http://192.168.1.198:5001"; // your API base

const ProfileDetail = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE}/profiles/${id}`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Failed to fetch profile:", err));
  }, [id]);

  if (!profile) return <p className="text-center mt-5">Loading profile...</p>;

  return (
    <div className="container mt-4 narrow-container">
      <h2 className="mb-3">{profile.name || "Unnamed Profile"}</h2>

      {/* Carousel for images */}
      {profile.images?.length > 0 && (
        <div
          id={`carousel-${id}`}
          className="carousel slide mb-4"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {profile.images.map((img, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={`${API_BASE}${img}`}
                  alt={`profile-img-${index}`}
                  className="d-block w-100 rounded profile-img"
                />
              </div>
            ))}
          </div>

          {profile.images.length > 1 && (
            <>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#carousel-${id}`}
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target={`#carousel-${id}`}
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </>
          )}
        </div>
      )}

      {/* Profile Info */}
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Platform:</strong> {profile.Platform || "N/A"}
            </li>
            <li className="list-group-item">
              <strong>PID:</strong> {profile.pid || "N/A"}
            </li>
            <li className="list-group-item">
              <strong>Height:</strong> {profile.height || "N/A"}
            </li>
            <li className="list-group-item">
              <strong>Age:</strong> {profile.Age || "N/A"}
            </li>
            <li className="list-group-item">
              <strong>Date of Birth:</strong> {profile.dob || "N/A"}
            </li>
            <li className="list-group-item">
              <strong>Occupation:</strong> {profile.occupation || "N/A"}
            </li>
            <li className="list-group-item">
              <strong>Education:</strong> {profile.education || "N/A"}
            </li>
          </ul>
        </div>

        <div className="col-md-6">
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Income:</strong> {profile.income || "N/A"}
            </li>
            <li className="list-group-item">
              <strong>Father's Number:</strong> {profile.fatherNo || "N/A"}
            </li>
            <li className="list-group-item">
              <strong>Girl's Number:</strong> {profile.GirlNo || "N/A"}
            </li>
            <li className="list-group-item">
              <strong>Place:</strong> {profile.Place || "N/A"}
            </li>
            <li className="list-group-item">
              <strong>Food Preference:</strong> {profile.Food || "N/A"}
            </li>
            <li className="list-group-item">
              <strong>Hometown:</strong> {profile.Hometown || "N/A"}
            </li>
            <li className="list-group-item">
              <strong>Citizenship:</strong> {profile.Citizen || "N/A"}
            </li>
            {/* <li className="list-group-item">
              <strong>Mongo ID:</strong> {profile._id}
            </li> */}
          </ul>
        </div>
      </div>

      <div className="mt-4">
        <Link to="/" className="btn btn-secondary">
          ← Back to Profiles
        </Link>
      </div>
    </div>
  );
};

export default ProfileDetail;
