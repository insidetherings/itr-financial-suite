// src/pages/UserManagement.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./UserManagement.css";

export default function UserManagement() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Jon Hawkins",
      role: "Admin",
      email: "jon@insidetherings.com",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      name: "Alex Kim",
      role: "Finance Analyst",
      email: "alex.kim@insidetherings.com",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      id: 3,
      name: "Taylor Brooks",
      role: "Data Manager",
      email: "taylor.brooks@insidetherings.com",
      avatar: "https://i.pravatar.cc/150?img=3"
    }
  ]);

  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editData, setEditData] = useState({ ...users[0] });
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Finance Analyst",
    avatar: "",
  });
  const [previewAvatar, setPreviewAvatar] = useState(null);

  // -----------------------------
  // 🟦 Shared Avatar Upload Logic
  // -----------------------------
  const handleFileUpload = (file, setter) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setter(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e, setter) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleFileUpload(file, setter);
  };

  const handleDragOver = (e) => e.preventDefault();

  // -----------------------------
  // 🟢 Edit Existing User
  // -----------------------------
  const handleEditClick = () => {
    setEditData({ ...selectedUser });
    setPreviewAvatar(null);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const finalAvatar = previewAvatar || editData.avatar;
    const updatedUser = { ...editData, avatar: finalAvatar };
    setUsers((prev) =>
      prev.map((u) => (u.id === editData.id ? updatedUser : u))
    );
    setSelectedUser(updatedUser);
    setIsEditing(false);
  };

  // -----------------------------
  // 🟣 Add New User
  // -----------------------------
  const handleAddUser = () => {
    setNewUser({
      name: "",
      email: "",
      role: "Finance Analyst",
      avatar: "",
    });
    setPreviewAvatar(null);
    setIsAdding(true);
  };

  const handleSaveNewUser = () => {
    const id = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    const avatar = previewAvatar || "https://i.pravatar.cc/150?u=" + id;
    const newUserEntry = { id, ...newUser, avatar };
    setUsers([...users, newUserEntry]);
    setSelectedUser(newUserEntry);
    setIsAdding(false);
  };

  // -----------------------------
  // 🔴 Delete User
  // -----------------------------
  const handleDelete = () => {
    const updated = users.filter((u) => u.id !== selectedUser.id);
    setUsers(updated);
    setSelectedUser(updated[0] || null);
  };

  return (
    <motion.div
      className="user-management"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>User Management</h1>
      <p>Manage team access, profiles, and permissions.</p>

      <div className="user-layout">
        {/* Left: User List */}
        <div className="user-list">
          <div className="user-list-header">
            <h2>Team Members</h2>
            <button className="add-btn" onClick={handleAddUser}>
              + Add New User
            </button>
          </div>

          {users.length > 0 ? (
            users.map((user) => (
              <motion.div
                key={user.id}
                className={`user-card ${
                  selectedUser && selectedUser.id === user.id ? "active" : ""
                }`}
                onClick={() => setSelectedUser(user)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="user-avatar"
                  onError={(e) => (e.target.style.backgroundColor = "#ccc")}
                />
                <div className="user-info">
                  <h3>{user.name}</h3>
                  <p>{user.role}</p>
                  <span>{user.email}</span>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="no-users">No users remaining.</p>
          )}
        </div>

        {/* Right: Profile Editor */}
        {selectedUser ? (
          <motion.div
            className="user-details"
            key={selectedUser.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2>Profile</h2>
            <div className="profile-avatar">
              <motion.img
                src={selectedUser.avatar}
                alt={selectedUser.name}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <form>
              <label>Name</label>
              <input type="text" value={selectedUser.name} readOnly />

              <label>Email</label>
              <input type="email" value={selectedUser.email} readOnly />

              <label>Role</label>
              <select value={selectedUser.role} disabled>
                <option>Admin</option>
                <option>Finance Analyst</option>
                <option>Data Manager</option>
              </select>

              <div className="user-actions">
                <button className="edit-btn" type="button" onClick={handleEditClick}>
                  Edit
                </button>
                <button className="delete-btn" type="button" onClick={handleDelete}>
                  Remove
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <div className="user-details empty">Select a user to view details</div>
        )}
      </div>

      {/* ✳️ Add New User Modal */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2>Add New User</h2>

              <div
                className="avatar-upload"
                onDrop={(e) => handleDrop(e, setPreviewAvatar)}
                onDragOver={handleDragOver}
              >
                <img
                  src={previewAvatar || "https://via.placeholder.com/100"}
                  alt="Preview"
                  className="avatar-preview"
                />
                <label htmlFor="newAvatarUpload" className="upload-label">
                  Drag & Drop or Click to Upload
                </label>
                <input
                  id="newAvatarUpload"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileUpload(e.target.files[0], setPreviewAvatar)
                  }
                />
              </div>

              <label>Name</label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, name: e.target.value }))
                }
              />

              <label>Email</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, email: e.target.value }))
                }
              />

              <label>Role</label>
              <select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, role: e.target.value }))
                }
              >
                <option>Admin</option>
                <option>Finance Analyst</option>
                <option>Data Manager</option>
              </select>

              <div className="modal-actions">
                <button onClick={handleSaveNewUser} className="save-btn">
                  Add User
                </button>
                <button
                  onClick={() => setIsAdding(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✳️ Edit Existing User Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2>Edit Profile</h2>

              <div
                className="avatar-upload"
                onDrop={(e) => handleDrop(e, setPreviewAvatar)}
                onDragOver={handleDragOver}
              >
                <img
                  src={previewAvatar || editData.avatar}
                  alt="Avatar Preview"
                  className="avatar-preview"
                />
                <label htmlFor="avatarUpload" className="upload-label">
                  Drag & Drop or Click to Upload
                </label>
                <input
                  id="avatarUpload"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileUpload(e.target.files[0], setPreviewAvatar)
                  }
                />
              </div>

              <label>Name</label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, name: e.target.value }))
                }
              />

              <label>Email</label>
              <input
                type="email"
                value={editData.email}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, email: e.target.value }))
                }
              />

              <label>Role</label>
              <select
                value={editData.role}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, role: e.target.value }))
                }
              >
                <option>Admin</option>
                <option>Finance Analyst</option>
                <option>Data Manager</option>
              </select>

              <div className="modal-actions">
                <button onClick={handleSaveEdit} className="save-btn">
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
