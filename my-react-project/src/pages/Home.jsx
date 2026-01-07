import React from "react";
import "../styles/main.css";

function Home({ setPage }) {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>🍽 FoodPack</h1>

        <p className="hero-subtitle">
          Order food with <strong>customized packing options</strong><br />
          Choose how your food is packed & pay accordingly.
        </p>

        <ul className="usp-list">
          <li>📦 Food-specific packing</li>
          <li>💰 Transparent packing charges</li>
          <li>🚚 Smart delivery pricing</li>
        </ul>

        {/* ✅ React navigation */}
        <button
          className="primary-btn hero-btn"
          onClick={() => setPage("login")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;
