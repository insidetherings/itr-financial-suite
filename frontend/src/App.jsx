import React, { useEffect, useState } from "react";

export default function App() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch("/api/reports")
      .then((res) => res.json())
      .then(setReports)
      .catch(() => setReports([]));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>Inside the Rings Financial Suite</h1>
      <h2>Monthly Reports</h2>
      {reports.length === 0 ? (
        <p>No reports yet. Once invoices exist and the monthly job runs, reports will appear here.</p>
      ) : (
        <ul>
          {reports.map((r) => (
            <li key={r.id}>
              <a href={`/api/reports/${r.id}/download`} target="_blank" rel="noreferrer">
                {r.filename} ({r.size_kb} KB)
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
