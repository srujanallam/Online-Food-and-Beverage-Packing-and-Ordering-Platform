import React, { useEffect, useState } from "react";
import "../styles/main.css";
import "../styles/admin.css";

function ManagePacking({ setPage }) {
  const [packingOptions, setPackingOptions] = useState([]);
  const [form, setForm] = useState({
    category: "",
    type: "",
    charge: ""
  });

  // 🔐 ADMIN AUTH + LOAD DATA
  useEffect(() => {
    const role = localStorage.getItem("role");
    const admin = JSON.parse(localStorage.getItem("loggedInUser"));

    if (role !== "admin" || !admin) {
      setPage("login");
      return;
    }

    setPackingOptions(
      JSON.parse(localStorage.getItem("packingOptions")) || []
    );
  }, [setPage]);

  // ➕ ADD PACKING
  const addPacking = () => {
    if (!form.category || !form.type || !form.charge) {
      alert("Please fill all packing details");
      return;
    }

    const newOption = {
      id: Date.now(),
      category: form.category,
      type: form.type,
      charge: Number(form.charge)
    };

    const updated = [...packingOptions, newOption];
    setPackingOptions(updated);
    localStorage.setItem("packingOptions", JSON.stringify(updated));

    setForm({ category: "", type: "", charge: "" });
  };

  // ❌ DELETE PACKING
  const deletePacking = (id) => {
    if (!window.confirm("Delete this packing option?")) return;

    const updated = packingOptions.filter(p => p.id !== id);
    setPackingOptions(updated);
    localStorage.setItem("packingOptions", JSON.stringify(updated));
  };

  return (
    <div className="admin-dashboard">
      {/* NAVBAR */}
      <header className="navbar">
        <h2 onClick={() => setPage("admin")} style={{ cursor: "pointer" }}>
          ⬅ Manage Packing
        </h2>
        <button
          onClick={() => {
            localStorage.clear();
            setPage("login");
          }}
        >
          Logout
        </button>
      </header>

      {/* ADD PACKING */}
      <section className="category-section">
        <h3>Add Packing Option</h3>

        <div className="category-card">
          <select
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
          >
            <option value="">Select Category</option>
            <option>Cake</option>
            <option>Pizza</option>
            <option>Biriyani</option>
            <option>Beverage</option>
            <option>Burger</option>
            <option>Sandwich</option>
            <option>Ice Cream</option>
          </select>

          <input
            placeholder="Packing Type (e.g. Ice Box)"
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
          />

          <input
            type="number"
            placeholder="Packing Charge (₹)"
            value={form.charge}
            onChange={e => setForm({ ...form, charge: e.target.value })}
          />

          <button className="primary-btn" onClick={addPacking}>
            Add Packing Option
          </button>
        </div>
      </section>

      {/* PACKING LIST */}
      <section className="category-section">
        <h3>Existing Packing Options</h3>

        {packingOptions.length === 0 && (
          <p style={{ color: "#777" }}>No packing options added yet.</p>
        )}

        {packingOptions.map(p => (
          <div className="category-card" key={p.id}>
            <h4>{p.type}</h4>
            <p>Category: {p.category}</p>
            <p>Charge: ₹{p.charge}</p>

            <button
              className="primary-btn"
              style={{ marginTop: "10px" }}
              onClick={() => deletePacking(p.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ManagePacking;
