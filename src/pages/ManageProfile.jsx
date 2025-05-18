import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "../components/ProfileCard"; // adjust path if needed
import "./NewProfile.css";
const API_BASE = "http://192.168.1.198:5001";

const ManageProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [editingProfile, setEditingProfile] = useState(null);
  const initialForm = {
    name: "",
    email: "",
    Platform: "",
    pid: "",
    height: "",
    Age: "",
    dob: "",
    occupation: "",
    education: "",
    income: "",
    fatherNo: "",
    GirlNo: "",
    Place: "",
    Food: "",
    Hometown: "",
    Citizen: "",
    // id: "",
  };

  const [form, setForm] = useState(initialForm);

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

    try {
      if (editingProfile) {
        // Only send JSON for update
        await axios.put(`${API_BASE}/profiles/${editingProfile._id}`, form);
        alert("Profile updated!");
      } else {
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) =>
          formData.append(key, value)
        );
        files.forEach((file) => formData.append("images", file));

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
    setForm(initialForm);
    setFiles([]);
    const fileInput = document.getElementById("fileInput");
    if (fileInput) fileInput.value = "";
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
    const filled = {};
    Object.keys(initialForm).forEach((key) => {
      filled[key] = profile[key] || "";
    });
    setForm(filled);
    setFiles([]);
  };

  return (
    <div className="container">
      <h2>{editingProfile ? "Edit Profile" : "Add New Profile"}</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-grid">
          {Object.keys(initialForm).map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          ))}
        </div>

        {!editingProfile && (
          <input
            id="fileInput"
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setFiles(Array.from(e.target.files))}
          />
        )}

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
