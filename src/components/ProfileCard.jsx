// components/ProfileCard.jsx
import React from "react";
import axios from "axios";

const API_BASE = "http://192.168.1.198:5001";

const ProfileCard = ({ profile, handleEdit, handleDelete, fetchProfiles }) => {
  const handleImageUpload = async (e) => {
    e.preventDefault();
    const extraInput = document.getElementById(`extra-${profile._id}`);
    const extraFiles = extraInput.files;
    if (extraFiles.length === 0) return alert("Select images to upload");

    const formData = new FormData();
    for (let file of extraFiles) {
      formData.append("images", file);
    }

    try {
      await axios.post(`${API_BASE}/profiles/${profile._id}/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Images uploaded");
      fetchProfiles();
      extraInput.value = "";
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="profile-card">
      <h4>
        Name: {profile.name} || Email: {profile.email}
      </h4>
      <div className="image-grid">
        {profile.images.map((img, i) => (
          <div key={i} className="image-wrapper">
            <img src={`${API_BASE}${img}`} alt={`img-${i}`} className="image" />
            <a href={`${API_BASE}${img}`} download className="download-button">
              Download
            </a>
          </div>
        ))}
      </div>
      <div className="actions">
        <form onSubmit={handleImageUpload}>
          <input
            id={`extra-${profile._id}`}
            type="file"
            accept="image/*"
            multiple
            style={{ marginTop: "10px" }}
          />
          <button type="submit">Add Images</button>
        </form>
        <hr />
        <button onClick={() => handleEdit(profile)}>Edit Profile</button>
        <button onClick={() => handleDelete(profile._id)}>
          Delete Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
