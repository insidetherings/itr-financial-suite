// src/pages/ReportsDashboard.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./ReportsDashboard.css";

export default function ReportsDashboard() {
  const [metrics, setMetrics] = useState({
    income: 0,
    expenses: 0,
    balance: 0,
    outstanding: 0,
  });
  const [view, setView] = useState("monthly"); // monthly or quarterly

  // Generate random mock data
  const generateData = (period) => {
    if (period === "monthly") {
      return Array.from({ length: 12 }, (_, i) => ({
        period: new Date(2024, i).toLocaleString("default", { month: "short" }),
        income: Math.floor(Math.random() * 10000) + 5000,
        expenses: Math.floor(Math.random() * 8000) + 3000,
      }));
    } else {
      const quarters = ["Q1", "Q2", "Q3", "Q4"];
      return quarters.map((q) => ({
        period: q,
        income: Math.floor(Math.random() * 30000) + 15000,
        expenses: Math.floor(Math.random() * 24000) + 9000,
      }));
    }
  };

  const [chartData, setChartData] = useState(generateData("monthly"));

  useEffect(() => {
    setTimeout(() => {
      setMetrics({
        income: 84500,
        expenses: 66200,
        balance: 18300,
        outstanding: 12100,
      });
    }, 600);
  }, []);

  const toggleView = () => {
    const newView = view === "monthly" ? "quarterly" : "monthly";
    setView(newView);
    setChartData(generateData(newView));
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const income = payload.find((p) => p.dataKey === "income")?.value || 0;
      const expenses = payload.find((p) => p.dataKey === "expenses")?.value || 0;
      return (
        <motion.div
          className="custom-tooltip"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="label">{label}</p>
          <p className="income">💰 Income: ${income.toLocaleString()}</p>
          <p className="expenses">💸 Expenses: ${expenses.toLocaleString()}</p>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <div className="reports-dashboard">
      <motion.h1
        className="reports-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Reports & Insights
      </motion.h1>

      <div className="summary-cards">
        {[
          { label: "Income", value: metrics.income, color: "#0085C7" },
          { label: "Expenses", value: metrics.expenses, color: "#DF0024" },
          { label: "Net Balance", value: metrics.balance, color: "#00A651" },
          { label: "Outstanding", value: metrics.outstanding, color: "#F4C300" },
        ].map((card, i) => (
          <motion.div
            key={i}
            className="summary-card"
            style={{ borderTop: `6px solid ${card.color}` }}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * i, duration: 0.5 }}
          >
            <h3>{card.label}</h3>
            <p style={{ color: card.color }}>
              ${card.value.toLocaleString()}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="chart-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="chart-header">
          <h2>
            {view === "monthly" ? "Monthly Performance" : "Quarterly Overview"}
          </h2>
          <button onClick={toggleView} className="toggle-button">
            Switch to {view === "monthly" ? "Quarterly" : "Monthly"} View
          </button>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0085C7" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0085C7" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expensesFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#DF0024" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#DF0024" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#0085C7"
              fill="url(#incomeFill)"
              animationDuration={1200}
              activeDot={{ r: 6 }}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#DF0024"
              fill="url(#expensesFill)"
              animationDuration={1200}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="export-row">
        <button onClick={() => console.log("Export PDF clicked")}>
          📄 Download PDF
        </button>
        <button onClick={() => console.log("Export CSV clicked")}>
          📊 Export CSV
        </button>
      </div>
    </div>
  );
}
