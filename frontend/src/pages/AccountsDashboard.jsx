// src/pages/AccountsDashboard.jsx
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import "./AccountsDashboard.css";

export default function AccountsDashboard() {
  const [accounts, setAccounts] = useState([]);

  // Generate mock monthly data
  useEffect(() => {
    const baseAccounts = [
      { id: 1, name: "Operations Fund", balance: 32000, color: "#0071BC", performance: 75 },
      { id: 2, name: "Marketing Fund", balance: 18000, color: "#F5A623", performance: 45 },
      { id: 3, name: "Events Fund", balance: 5000, color: "#000000", performance: 20 },
      { id: 4, name: "Athlete Fund", balance: 27000, color: "#009639", performance: 60 },
      { id: 5, name: "Community Fund", balance: 12000, color: "#E41E26", performance: 30 },
    ];

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const accountsWithTrends = baseAccounts.map((acct) => ({
      ...acct,
      trend: months.map((month) => ({
        month,
        balance: acct.balance + (Math.random() - 0.5) * 4000,
      })),
    }));

    setAccounts(accountsWithTrends);
  }, []);

  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ padding: "1rem" }}>
      <h2 style={{ fontFamily: "Olympic Sans, sans-serif" }}>Accounts Overview</h2>
      <div className="accounts-grid">
        {accounts.map((acct, index) => (
          <motion.div
            key={acct.id}
            className="account-card"
            style={{ borderTopColor: acct.color }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
          >
            <h3>{acct.name}</h3>
            <p>Balance: ${acct.balance.toLocaleString()}</p>

            <div className="chart-container">
              <ResponsiveContainer width="100%" height={80}>
                <LineChart data={acct.trend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" hide />
                  <YAxis hide />
                  <Tooltip formatter={(val) => `$${val.toFixed(0)}`} />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    stroke={acct.color}
                    strokeWidth={2}
                    dot={{ r: 3, fill: acct.color }}
                    isAnimationActive={true}
                    animationDuration={1000}
                    animationBegin={index * 200}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="performance-bar">
              <div
                className="fill"
                style={{
                  width: `${acct.performance}%`,
                  backgroundColor: acct.color,
                  transition: "width 1s ease-in-out",
                }}
              ></div>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="add-btn" onClick={() => setShowModal(true)}>
        ➕ Add Account
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <motion.div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3>Add New Account</h3>
            <input placeholder="Account Name" />
            <input placeholder="Initial Balance" type="number" />
            <button onClick={() => setShowModal(false)}>Save</button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
