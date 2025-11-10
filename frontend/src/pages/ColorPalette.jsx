// src/pages/ColorPalette.jsx
import React, { useState } from "react";
import "../index.css";

const colors = [
  { name: "Olympic Blue", var: "--olympic-blue", hex: "#0081C8" },
  { name: "Olympic Yellow", var: "--olympic-yellow", hex: "#F4C300" },
  { name: "Olympic Black", var: "--olympic-black", hex: "#000000" },
  { name: "Olympic Green", var: "--olympic-green", hex: "#00A651" },
  { name: "Olympic Red", var: "--olympic-red", hex: "#EE334E" },
  { name: "Light Blue", var: "--olympic-light-blue", hex: "#5BC0EB" },
  { name: "Navy", var: "--olympic-navy", hex: "#00205B" },
  { name: "Sky", var: "--olympic-sky", hex: "#9ADBE8" },
  { name: "Gold", var: "--olympic-gold", hex: "#C9A23F" },
  { name: "Silver", var: "--olympic-silver", hex: "#B1B3B3" },
  { name: "Bronze", var: "--olympic-bronze", hex: "#A97142" },
  { name: "White", var: "--olympic-white", hex: "#FFFFFF" },
  { name: "Gray", var: "--olympic-gray", hex: "#D9D9D6" },
  { name: "Dark Gray", var: "--olympic-dark-gray", hex: "#555555" },
];

export default function ColorPalette() {
  const [copied, setCopied] = useState(null);

  const handleCopy = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1500);
  };

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const downloadCSS = () => {
    const cssContent =
      ":root {\n" +
      colors.map((c) => `  ${c.var}: ${c.hex};`).join("\n") +
      "\n}";
    downloadFile(cssContent, "colors.css", "text/css");
  };

  const downloadJSON = () => {
    const jsonContent = JSON.stringify(colors, null, 2);
    downloadFile(jsonContent, "colors.json", "application/json");
  };

  return (
    <div
      style={{
        padding: "3rem",
        fontFamily: "Olympic Sans, Open Sans, sans-serif",
        background: "linear-gradient(135deg, #f4f4f4, #ffffff)",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          color: "var(--olympic-blue)",
          textAlign: "center",
          marginBottom: "1rem",
          fontSize: "2.5rem",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Inside the Rings Color System
      </h1>
      <p style={{ textAlign: "center", marginBottom: "1.5rem", color: "#555" }}>
        Click a hex code to copy it, or export your palette below.
      </p>

      {/* Export Buttons */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <button
          onClick={downloadCSS}
          style={{
            marginRight: "1rem",
            padding: "0.6rem 1.4rem",
            fontSize: "1rem",
            background: "var(--olympic-blue)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
          }}
        >
          ⬇️ Download CSS
        </button>
        <button
          onClick={downloadJSON}
          style={{
            padding: "0.6rem 1.4rem",
            fontSize: "1rem",
            background: "var(--olympic-gold)",
            color: "#000",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
          }}
        >
          ⬇️ Download JSON
        </button>
      </div>

      {/* Color Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {colors.map((c) => (
          <div
            key={c.name}
            style={{
              background: c.hex,
              borderRadius: "12px",
              boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
              height: "160px",
              color:
                c.name.includes("White") || c.name.includes("Yellow")
                  ? "#000"
                  : "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 3px 10px rgba(0,0,0,0.15)";
            }}
          >
            <strong style={{ fontSize: "1.1rem" }}>{c.name}</strong>
            <code style={{ fontSize: "0.9rem", opacity: 0.85 }}>{c.var}</code>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopy(c.hex);
              }}
              style={{
                marginTop: "0.4rem",
                background: "rgba(255,255,255,0.2)",
                border: "none",
                borderRadius: "8px",
                padding: "4px 10px",
                color:
                  c.name.includes("White") || c.name.includes("Yellow")
                    ? "#000"
                    : "#fff",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              {copied === c.hex ? "✅ Copied!" : c.hex}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
