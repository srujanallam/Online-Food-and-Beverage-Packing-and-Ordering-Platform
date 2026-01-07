import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/main.css";
import "../styles/user.css";

function UserDashboard({ setPage }) {
  const [user, setUser] = useState(null);

  const categories = [
    "Cake",
    "Pizza",
    "Biriyani",
    "Beverage",
    "Shawarma",
    "Burger",
    "Sandwich",
    "Ice Cream",
  ];

  useEffect(() => {
    const role = localStorage.getItem("role");
    const userData = JSON.parse(localStorage.getItem("loggedInUser"));

    if (role !== "user" || !userData) {
      setPage("login");
      return;
    }

    setUser(userData);
  }, [setPage]);

  const selectCategory = (category) => {
    localStorage.setItem("selectedCategory", category);
    localStorage.setItem("navigationMode", "category");
    setPage("menu"); // ✅ consistent navigation
  };

  if (!user) return null;

  return (
    <>
      <Navbar setPage={setPage} />

      <div className="user-container">
        <div className="welcome-card">
          <h3>Welcome, {user.name}!</h3>
          <p>What would you like to order today?</p>
        </div>

        <section className="category-section">
          <h3 className="section-title">Food Categories</h3>

          <div className="category-grid food-grid">
            {categories.map((cat) => (
              <div
                className="food-card"
                key={cat}
                onClick={() => selectCategory(cat)}
              >
                <h4>{cat}</h4>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default UserDashboard;
