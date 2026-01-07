import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/main.css";
import "../styles/user.css";

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("role") !== "user") {
      window.location.href = "/login";
      return;
    }

    let data = JSON.parse(localStorage.getItem("restaurants")) || [];

    if (data.length === 0) {
      data = [
        { id: 1, name: "Sweet Treats", category: "Bakery" },
        { id: 2, name: "Spicy Hub", category: "Indian" },
        { id: 3, name: "Pizza Palace", category: "Fast Food" }
      ];
      localStorage.setItem("restaurants", JSON.stringify(data));
    }

    setRestaurants(data);
  }, []);

  const selectRestaurant = (res) => {
    localStorage.setItem("selectedRestaurant", JSON.stringify(res));
    localStorage.setItem("navigationMode", "restaurant");
    window.location.href = "/menu";
  };

  return (
    <>
      <Navbar />

      <section className="category-section">
        <h3>Available Restaurants</h3>

        <div className="category-grid">
          {restaurants.map(r => (
            <div key={r.id} className="category-card" onClick={() => selectRestaurant(r)}>
              🏬
              <h4>{r.name}</h4>
              <p style={{ fontSize: "13px", color: "#777" }}>{r.category}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default RestaurantList;
