import React, { useEffect, useState } from "react";
import "../styles/main.css";
import "../styles/admin.css";

function ManageFoods({ setPage }) {
  const [restaurants, setRestaurants] = useState([]);
  const [foods, setFoods] = useState([]);
  const [form, setForm] = useState({
    restaurantId: "",
    name: "",
    category: "",
    price: ""
  });

  // 🔐 ADMIN AUTH CHECK + LOAD DATA
  useEffect(() => {
    const role = localStorage.getItem("role");
    const admin = JSON.parse(localStorage.getItem("loggedInUser"));

    if (role !== "admin" || !admin) {
      setPage("login");
      return;
    }

    setRestaurants(JSON.parse(localStorage.getItem("restaurants")) || []);
    setFoods(JSON.parse(localStorage.getItem("foods")) || []);
  }, [setPage]);

  // ➕ ADD FOOD
  const addFood = () => {
    if (!form.restaurantId || !form.name || !form.category || !form.price) {
      alert("Please fill all food details");
      return;
    }

    const newFood = {
      id: Date.now(),
      restaurantId: Number(form.restaurantId),
      name: form.name,
      category: form.category,
      price: Number(form.price)
    };

    const updatedFoods = [...foods, newFood];
    setFoods(updatedFoods);
    localStorage.setItem("foods", JSON.stringify(updatedFoods));

    setForm({ restaurantId: "", name: "", category: "", price: "" });
  };

  // ❌ DELETE FOOD
  const deleteFood = (id) => {
    if (!window.confirm("Delete this food item?")) return;

    const updated = foods.filter(f => f.id !== id);
    setFoods(updated);
    localStorage.setItem("foods", JSON.stringify(updated));
  };

  return (
    <div className="admin-dashboard">
      {/* NAVBAR */}
      <header className="navbar">
        <h2 onClick={() => setPage("admin")} style={{ cursor: "pointer" }}>
          ⬅ Manage Foods
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

      {/* ADD FOOD */}
      <section className="category-section">
        <h3>Add Food Item</h3>

        <div className="category-card">
          <select
            value={form.restaurantId}
            onChange={e => setForm({ ...form, restaurantId: e.target.value })}
          >
            <option value="">Select Restaurant</option>
            {restaurants.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>

          <input
            placeholder="Food Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

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
            type="number"
            placeholder="Price (₹)"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
          />

          <button className="primary-btn" onClick={addFood}>
            Add Food
          </button>
        </div>
      </section>

      {/* FOOD LIST */}
      <section className="category-section">
        <h3>Existing Foods</h3>

        {foods.length === 0 && (
          <p style={{ color: "#777" }}>No foods added yet.</p>
        )}

        {foods.map(food => {
          const rest = restaurants.find(r => r.id === food.restaurantId);

          return (
            <div className="category-card" key={food.id}>
              <h4>{food.name}</h4>
              <p>Restaurant: {rest?.name || "Unknown"}</p>
              <p>Category: {food.category}</p>
              <p>Price: ₹{food.price}</p>

              <button
                className="primary-btn"
                style={{ marginTop: "10px" }}
                onClick={() => deleteFood(food.id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default ManageFoods;
