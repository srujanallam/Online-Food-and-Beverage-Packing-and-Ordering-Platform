import React, { useEffect } from "react";
import "../styles/main.css";
import "../styles/admin.css";

function AdminDashboard({ setPage }) {

  // 🔐 AUTH CHECK
  useEffect(() => {
    const role = localStorage.getItem("role");
    const admin = JSON.parse(localStorage.getItem("loggedInUser"));

    if (role !== "admin" || !admin) {
      window.location.href = "/";
    }
  }, []);

  // 📍 PAGE NAVIGATION
  const goTo = (page) => {
    setPage(page);
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.clear();
    setPage("login");
  };

  return (
    <div className="admin-dashboard">
      <header className="navbar">
        <h2>🛠 Admin Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </header>

      <section className="category-section">
        <h3>Management Panel</h3>

        <div className="category-grid">
          <div
            className="category-card"
            onClick={() => goTo("manage-restaurants")}
          >
            🏬
            <h4>Manage Restaurants</h4>
          </div>

          <div
            className="category-card"
            onClick={() => goTo("manage-foods")}
          >
            🍽
            <h4>Manage Foods</h4>
          </div>

          <div
            className="category-card"
            onClick={() => goTo("manage-packing")}
          >
            📦
            <h4>Manage Packing</h4>
          </div>

          <div
            className="category-card"
            onClick={() => goTo("view-orders")}
          >
            📊
            <h4>View Orders</h4>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
