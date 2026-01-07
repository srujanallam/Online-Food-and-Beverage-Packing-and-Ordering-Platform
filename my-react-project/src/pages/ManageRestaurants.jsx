import React, { useEffect, useState } from "react";
import "../styles/main.css";
import "../styles/admin.css";

function ManageRestaurants({ setPage }) {
  const [restaurants, setRestaurants] = useState([]);
  const [form, setForm] = useState({ name: "", category: "" });

  // 🔐 ADMIN AUTH CHECK + LOAD DATA
  useEffect(() => {
    const role = localStorage.getItem("role");
    const admin = JSON.parse(localStorage.getItem("loggedInUser"));

    if (role !== "admin" || !admin) {
      setPage("login");
      return;
    }

    setRestaurants(JSON.parse(localStorage.getItem("restaurants")) || []);
  }, [setPage]);

  // ➕ ADD RESTAURANT
  const addRestaurant = () => {
    if (!form.name || !form.category) {
      alert("Please fill all fields");
      return;
    }

    const newRestaurant = {
      id: Date.now(),
      name: form.name,
      category: form.category
    };

    const updated = [...restaurants, newRestaurant];
    setRestaurants(updated);
    localStorage.setItem("restaurants", JSON.stringify(updated));

    setForm({ name: "", category: "" });
  };

  // ❌ DELETE RESTAURANT
  const deleteRestaurant = (id) => {
    if (!window.confirm("Delete this restaurant?")) return;

    const updated = restaurants.filter(r => r.id !== id);
    setRestaurants(updated);
    localStorage.setItem("restaurants", JSON.stringify(updated));
  };

  return (
    <div className="admin-dashboard">
      {/* NAVBAR */}
      <header className="navbar">
        <h2 onClick={() => setPage("admin")} style={{ cursor: "pointer" }}>
          ⬅ Manage Restaurants
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

      {/* ADD RESTAURANT */}
      <section className="category-section">
        <h3>Add New Restaurant</h3>

        <div className="category-card">
          <input
            placeholder="Restaurant Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Category (Indian / Bakery / Fast Food)"
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
          />

          <button className="primary-btn" onClick={addRestaurant}>
            Add Restaurant
          </button>
        </div>
      </section>

      {/* RESTAURANT LIST */}
      <section className="category-section">
        <h3>Existing Restaurants</h3>

        {restaurants.length === 0 && (
          <p style={{ color: "#777" }}>No restaurants added yet.</p>
        )}

        {restaurants.map(r => (
          <div className="category-card" key={r.id}>
            <h4>{r.name}</h4>
            <p>Category: {r.category}</p>

            <button
              className="primary-btn"
              style={{ marginTop: "10px" }}
              onClick={() => deleteRestaurant(r.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ManageRestaurants;
