import React from "react";
import "../styles/main.css";
import "../styles/user.css";

function Navbar() {
  const goBack = () => window.history.back();
  const goHome = () => alert("Navigate to Home");
  const goToCart = () => alert("Navigate to Cart");
  const goToOrders = () => alert("Navigate to Orders");
  const logout = () => alert("Logged out");

  return (
    <header className="navbar">
      <div className="nav-left">
        <span className="back-btn" onClick={goBack}>⬅</span>
        <h2 className="logo" onClick={goHome}>🍽 FoodPack</h2>
      </div>

      <div className="nav-actions">
        <button className="nav-btn" onClick={goToCart}>🛒 Cart</button>
        <button className="nav-btn" onClick={goToOrders}>📦 My Orders</button>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
    </header>
  );
}

export default Navbar;
