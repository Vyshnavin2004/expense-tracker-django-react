import React from "react";

function Summary({ summary }) {
  if (!summary) return null;

  return (
    <div className="card">
      <h2>Summary</h2>
      <div className="summary-total">₹{summary.total}</div>
      <p style={{ color: "#777" }}>Total spent</p>
      <hr />
      {summary.by_category.map((item) => (
        <div className="expense-row" key={item.category}>
          <span>{item.category}</span>
          <span>₹{item.total}</span>
        </div>
      ))}
    </div>
  );
}

export default Summary;
