// src/pages/UserProfile.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import "./UserProfile.css";

export default function UserProfile() {
  const [avatar, setAvatar] = useState("/default-avatar.png");
  const [dragging, setDragging] = useState(false);
  const [profile, setProfile] = useState({
    name: "Jon Hawkins",
    email: "jonh@example.com",
    role: "Administrator",
    notifications: true,
    darkMode: false,
  });

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile({
      ...profile,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    console.log("Profile saved:", profile);
    alert("✅ Profile updated successfully!");
  };

  return (
    <motion.div
      className="user-profile-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h1>User Profile</h1>

      <div className="profile-container">
        <div
          className={`avatar-upload ${dragging ? "dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <img src={avatar} alt="User Avatar" className="avatar" />
          <label htmlFor="avatarInput" className="upload-label">
            Drag & drop or click to upload new avatar
          </label>
          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="profile-fields">
          <label>
            Name
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Role
            <input
              type="text"
              name="role"
              value={profile.role}
              onChange={handleChange}
            />
          </label>

          <div className="preferences">
            <label className="toggle">
              <input
                type="checkbox"
                name="notifications"
                checked={profile.notifications}
                onChange={handleChange}
              />
              Enable Notifications
            </label>

            <label className="toggle">
              <input
                type="checkbox"
                name="darkMode"
                checked={profile.darkMode}
                onChange={handleChange}
              />
              Dark Mode
            </label>
          </div>

          <div className="password-section">
            <h3>Change Password</h3>
            <input type="password" placeholder="Current Password" />
            <input type="password" placeholder="New Password" />
            <input type="password" placeholder="Confirm New Password" />
          </div>

          <div className="actions">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="save-btn"
              onClick={handleSave}
            >
              Save Changes
            </motion.button>
            <button
              className="cancel-btn"
              onClick={() => window.location.reload()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
