import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css";
import NewProfile from "./pages/NewProfile.jsx";

const API_BASE = "http://localhost:5001";

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

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/profiles`)
      .then((res) => setProfiles(res.data))
      .catch(() => setProfiles([]));
  }, []);

  return (
    <div className="profile-list">
      <h2>All Profiles</h2>
      {profiles.length === 0 && <p>No profiles found.</p>}
      {profiles.map((profile) => (
        <div key={profile._id} className="profile-card">
          <h3>{profile.name}</h3>
          <p>{profile.email}</p>
          <div className="image-grid">
            {profile.images.map((img, i) => (
              <div key={i} className="image-wrapper">
                <img
                  src={`${API_BASE}${img}`}
                  alt={`Profile ${i}`}
                  className="image-preview"
                />
                <a
                  href={`${API_BASE}${img}`}
                  download
                  className="download-button"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// const NewProfile = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [files, setFiles] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name || !email || files.length === 0) return alert("Fill all fields");

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("email", email);
//     for (const file of files) {
//       formData.append("images", file);
//     }

//     try {
//       await axios.post(`${API_BASE}/profiles`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("Profile created!");
//       setName("");
//       setEmail("");
//       setFiles([]);
//     } catch (err) {
//       console.error("Error:", err);
//       alert("Failed to upload");
//     }
//   };

//   return (
//     <div className="new-profile-form">
//       <h2>Create New Profile</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Full Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email Address"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={(e) => setFiles([...e.target.files])}
//         />
//         <button type="submit">Create Profile</button>
//       </form>
//     </div>
//   );
// };

export default App;
