import React from "react";
import api from "../api";

function ExpenseList({ expenses, onChanged }) {
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    await api.delete(`expenses/${id}/`);
    onChanged();
  };

  return (
    <div className="card">
      <h2>Recent Expenses</h2>
      {expenses.length === 0 && <p>No expenses yet — add your first one above.</p>}
      {expenses.map((exp) => (
        <div className="expense-row" key={exp.id}>
          <div>
            <strong>{exp.title}</strong>
            <div style={{ fontSize: 12, color: "#777" }}>
              {exp.date} · {exp.category_name || "Uncategorized"}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span>₹{exp.amount}</span>
            <button
              onClick={() => handleDelete(exp.id)}
              style={{ background: "#b00020", padding: "4px 10px" }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
