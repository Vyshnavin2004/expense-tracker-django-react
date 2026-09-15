import React, { useState, useEffect, useCallback } from "react";
import api from "../api";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import Summary from "./Summary";

function Dashboard({ onLogout }) {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);

  const loadData = useCallback(async () => {
    const [expRes, summaryRes] = await Promise.all([
      api.get("expenses/"),
      api.get("summary/"),
    ]);
    setExpenses(expRes.data);
    setSummary(summaryRes.data);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Expense Tracker</h1>
        <button onClick={onLogout} style={{ width: "auto" }}>
          Log Out
        </button>
      </div>

      <Summary summary={summary} />
      <ExpenseForm onAdded={loadData} />
      <ExpenseList expenses={expenses} onChanged={loadData} />
    </div>
  );
}

export default Dashboard;
