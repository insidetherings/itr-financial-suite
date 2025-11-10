// src/pages/ThemeSettings.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./ThemeSettings.css";

export default function ThemeSettings() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const themes = [
    { id: "light", label: "Light Mode", color: "#D9D9D6" },
    { id: "dark", label: "Dark Mode", color: "#555555" },
  ];

  return (
    <motion.div
      className="theme-settings"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Theme Settings</h1>
      <p>Choose your preferred visual mode:</p>

      <div className="theme-options">
        {themes.map((t) => (
          <motion.div
            key={t.id}
            className={`theme-card ${theme === t.id ? "active" : ""}`}
            onClick={() => setTheme(t.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ borderColor: t.color }}
          >
            <div
              className="theme-preview"
              style={{ backgroundColor: t.color }}
            ></div>
            <span>{t.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="theme-info">
        <p>
          Current Theme:{" "}
          <strong>
            {theme.charAt(0).toUpperCase() + theme.slice(1)} Mode
          </strong>
        </p>
      </div>
    </motion.div>
  );
}
