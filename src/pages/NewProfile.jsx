import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5001";

const ManageProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [editingProfile, setEditingProfile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const res = await axios.get(`${API_BASE}/profiles`);
      setProfiles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) return alert("Fill name and email");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    files.forEach((file) => formData.append("images", file));

    try {
      if (editingProfile) {
        await axios.put(`${API_BASE}/profiles/${editingProfile._id}`, {
          name,
          email,
        });
        alert("Profile updated!");
      } else {
        await axios.post(`${API_BASE}/profiles`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Profile created!");
      }
      resetForm();
      fetchProfiles();
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to submit");
    }
  };

  const resetForm = () => {
    setEditingProfile(null);
    setName("");
    setEmail("");
    setFiles([]);
    document.getElementById("fileInput").value = "";
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this profile?")) return;
    try {
      await axios.delete(`${API_BASE}/profiles/${id}`);
      fetchProfiles();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setName(profile.name);
    setEmail(profile.email);
    setFiles([]);
  };

  return (
    <div className="container">
      <h2>{editingProfile ? "Edit Profile" : "Add New Profile"}</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          id="fileInput"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setFiles([...e.target.files])}
        />
        <button type="submit">
          {editingProfile ? "Update Profile" : "Create Profile"}
        </button>
        {editingProfile && <button onClick={resetForm}>Cancel</button>}
      </form>

      <hr />

      <h3>All Profiles</h3>
      <div className="profile-list">
        {profiles.map((profile) => (
          <div key={profile._id} className="profile-card">
            <h4>{profile.name}</h4>
            <p>{profile.email}</p>
            <div className="image-grid">
              {profile.images.map((img, i) => (
                <div key={i} className="image-wrapper">
                  <img
                    src={`${API_BASE}${img}`}
                    alt={`img-${i}`}
                    className="image"
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
            <div className="actions">
              <button onClick={() => handleEdit(profile)}>Edit</button>
              <button onClick={() => handleDelete(profile._id)}>Delete</button>

              {/* Upload additional images */}
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const extraInput = document.getElementById(
                    `extra-${profile._id}`
                  );
                  const extraFiles = extraInput.files;
                  if (extraFiles.length === 0)
                    return alert("Select images to upload");

                  const formData = new FormData();
                  for (let file of extraFiles) {
                    formData.append("images", file);
                  }

                  try {
                    await axios.post(
                      `${API_BASE}/profiles/${profile._id}/images`,
                      formData,
                      {
                        headers: { "Content-Type": "multipart/form-data" },
                      }
                    );
                    alert("Images uploaded");
                    fetchProfiles();
                    extraInput.value = "";
                  } catch (err) {
                    console.error(err);
                    alert("Upload failed");
                  }
                }}
              >
                <input
                  id={`extra-${profile._id}`}
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ marginTop: "10px" }}
                />
                <button type="submit">Add Images</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProfiles;
