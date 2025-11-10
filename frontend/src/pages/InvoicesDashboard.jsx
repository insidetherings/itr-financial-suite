// src/pages/InvoicesDashboard.jsx
import { useState } from "react";
import "./InvoicesDashboard.css";

export default function InvoicesDashboard() {
  const [invoices, setInvoices] = useState([
    { id: 1, client: "Team USA", total: 12000, status: "Paid", date: "2025-10-02" },
    { id: 2, client: "IOC Marketing", total: 8500, status: "Pending", date: "2025-10-10" },
    { id: 3, client: "Utah 2034 Committee", total: 15000, status: "Overdue", date: "2025-09-28" },
    { id: 4, client: "NBC Sports", total: 7600, status: "Paid", date: "2025-10-15" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState({ client: "", total: "", status: "Pending" });

  const handleAddInvoice = () => {
    const id = invoices.length + 1;
    setInvoices([...invoices, { id, ...newInvoice, date: new Date().toISOString().split("T")[0] }]);
    setShowModal(false);
    setNewInvoice({ client: "", total: "", status: "Pending" });
  };

  const totals = {
    total: invoices.reduce((acc, inv) => acc + inv.total, 0),
    paid: invoices.filter(i => i.status === "Paid").reduce((acc, inv) => acc + inv.total, 0),
    pending: invoices.filter(i => i.status === "Pending").reduce((acc, inv) => acc + inv.total, 0),
    overdue: invoices.filter(i => i.status === "Overdue").reduce((acc, inv) => acc + inv.total, 0),
  };

  return (
    <div className="invoices-dashboard">
      <h1>Invoices Dashboard</h1>

      <div className="invoice-cards">
        <div className="invoice-card">
          <h3>Total (Monthly)</h3>
          <p>${totals.total.toLocaleString()}</p>
        </div>
        <div className="invoice-card">
          <h3>Paid (Monthly)</h3>
          <p>${totals.paid.toLocaleString()}</p>
        </div>
        <div className="invoice-card">
          <h3>Outstanding (Pending)</h3>
          <p>${totals.pending.toLocaleString()}</p>
        </div>
        <div className="invoice-card">
          <h3>Overdue (Monthly)</h3>
          <p>${totals.overdue.toLocaleString()}</p>
        </div>
      </div>

      <button className="add-btn" onClick={() => setShowModal(true)}>+ New Invoice</button>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id}>
              <td>{inv.id}</td>
              <td>{inv.client}</td>
              <td>${inv.total.toLocaleString()}</td>
              <td className={`status ${inv.status.toLowerCase()}`}>{inv.status}</td>
              <td>{inv.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>New Invoice</h2>
            <input
              type="text"
              placeholder="Client Name"
              value={newInvoice.client}
              onChange={(e) => setNewInvoice({ ...newInvoice, client: e.target.value })}
            />
            <input
              type="number"
              placeholder="Total"
              value={newInvoice.total}
              onChange={(e) => setNewInvoice({ ...newInvoice, total: parseFloat(e.target.value) || 0 })}
            />
            <select
              value={newInvoice.status}
              onChange={(e) => setNewInvoice({ ...newInvoice, status: e.target.value })}
            >
              <option>Pending</option>
              <option>Paid</option>
              <option>Overdue</option>
            </select>
            <button onClick={handleAddInvoice}>Add Invoice</button>
          </div>
        </div>
      )}
    </div>
  );
}
