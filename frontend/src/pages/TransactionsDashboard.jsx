import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./TransactionsDashboard.css";

export default function TransactionsDashboard() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("All");
  const [animateKey, setAnimateKey] = useState(0);

  // Randomized placeholder data
  useEffect(() => {
    const generateMockTransactions = () => {
      const categories = ["Sponsorship", "Merchandise", "Travel", "Facilities"];
      const types = ["Income", "Expense"];
      const newData = Array.from({ length: 12 }, (_, i) => {
        const type = types[Math.floor(Math.random() * 2)];
        const amount = type === "Income"
          ? Math.floor(Math.random() * 12000) + 3000
          : Math.floor(Math.random() * 6000) + 500;
        return {
          id: i + 1,
          date: `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
          type,
          category: categories[Math.floor(Math.random() * categories.length)],
          description: `${type} for ${categories[Math.floor(Math.random() * categories.length)]}`,
          amount,
        };
      });
      setTransactions(newData);
    };
    generateMockTransactions();
  }, []);

  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((t) => t.type === filter);

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const net = totalIncome - totalExpense;

  useEffect(() => {
    setAnimateKey((prev) => prev + 1);
  }, [filter]);

  return (
    <div className="transactions-dashboard">
      <h1>Transactions Dashboard</h1>

      <div className="filters">
        <button
          className={filter === "All" ? "active" : ""}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={filter === "Income" ? "active" : ""}
          onClick={() => setFilter("Income")}
        >
          Income
        </button>
        <button
          className={filter === "Expense" ? "active" : ""}
          onClick={() => setFilter("Expense")}
        >
          Expenses
        </button>
      </div>

      {/* Animated Summary Cards */}
      <div className="summary-cards">
        <AnimatePresence mode="wait">
          {/* Income Card (Green) */}
          <motion.div
            key={`income-${animateKey}`}
            className="summary-card income"
            initial={{ boxShadow: "0 0 0px rgba(0,166,81,0)" }}
            animate={{
              boxShadow: "0 0 20px rgba(0,166,81,0.5)",
              transition: { duration: 0.6 },
            }}
            exit={{ opacity: 0 }}
          >
            <h3>Total Income</h3>
            <p>${totalIncome.toLocaleString()}</p>
          </motion.div>

          {/* Expense Card (Red) */}
          <motion.div
            key={`expense-${animateKey}`}
            className="summary-card expense"
            initial={{ boxShadow: "0 0 0px rgba(218,41,28,0)" }}
            animate={{
              boxShadow: "0 0 20px rgba(218,41,28,0.5)",
              transition: { duration: 0.6 },
            }}
            exit={{ opacity: 0 }}
          >
            <h3>Total Expenses</h3>
            <p>${totalExpense.toLocaleString()}</p>
          </motion.div>

          {/* Net Card (Blue) */}
          <motion.div
            key={`net-${animateKey}`}
            className="summary-card net"
            initial={{ boxShadow: "0 0 0px rgba(0,114,206,0)" }}
            animate={{
              boxShadow: "0 0 20px rgba(0,114,206,0.5)",
              transition: { duration: 0.6 },
            }}
            exit={{ opacity: 0 }}
          >
            <h3>Net</h3>
            <p>${net.toLocaleString()}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Transactions Table */}
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount ($)</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td className={`type ${t.type.toLowerCase()}`}>{t.type}</td>
              <td>{t.category}</td>
              <td>{t.description}</td>
              <td>{t.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
