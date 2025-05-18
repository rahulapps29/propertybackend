import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "../components/ProfileCard"; // adjust path if needed

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
        />
        <input
          id="fileInput"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setFiles(Array.from(e.target.files))}
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
          <ProfileCard
            key={profile._id}
            profile={profile}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            fetchProfiles={fetchProfiles}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageProfiles;
