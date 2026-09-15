import React, { useState, useEffect } from "react";
import api from "../api";

function ExpenseForm({ onAdded }) {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    notes: "",
  });

  useEffect(() => {
    api.get("categories/").then((res) => setCategories(res.data));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("expenses/", form);
    setForm({ title: "", amount: "", date: "", category: "", notes: "" });
    onAdded();
  };

  return (
    <div className="card">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title (e.g. Groceries)"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="amount"
          type="number"
          step="0.01"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <textarea
          name="notes"
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={handleChange}
        />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default ExpenseForm;
