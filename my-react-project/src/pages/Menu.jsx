import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/main.css";
import "../styles/user.css";

function Menu({ goBack }) {
  const [foods, setFoods] = useState([]);
  const category = localStorage.getItem("selectedCategory");

  useEffect(() => {
    // AUTH CHECK
    const role = localStorage.getItem("role");
    if (role !== "user") {
      window.location.reload(); // safety fallback
      return;
    }

    // LOAD FOODS
    const storedFoods = JSON.parse(localStorage.getItem("foods")) || [];
    setFoods(storedFoods);
  }, []);

  if (!category) {
    return (
      <div className="user-container">
        <p>No category selected.</p>
        <button className="primary-btn" onClick={goBack}>Go Back</button>
      </div>
    );
  }

  const filteredFoods = foods.filter(
    (food) => food.category === category
  );

  const selectFood = (food) => {
    localStorage.setItem("selectedFood", JSON.stringify(food));
    window.location.href = "/packing"; // next screen
  };

  return (
    <>
      <Navbar />

      <div className="user-container">
        <button className="primary-btn" onClick={goBack}>
          ⬅ Back
        </button>

        <h2 style={{ marginTop: "20px" }}>
          {category} Items
        </h2>

        <div className="category-grid food-grid">
          {filteredFoods.length === 0 && (
            <p style={{ color: "#777" }}>No foods available</p>
          )}

          {filteredFoods.map((food) => (
            <div
              className="food-card"
              key={food.id}
              onClick={() => selectFood(food)}
              style={{ cursor: "pointer" }}
            >
              <h4>{food.name}</h4>
              <p>₹{food.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Menu;
