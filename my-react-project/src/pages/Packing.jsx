import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/main.css";
import "../styles/user.css";

function Packing() {
  const [food, setFood] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    // AUTH CHECK
    if (localStorage.getItem("role") !== "user") {
      window.location.href = "/";
      return;
    }

    const selectedFood = JSON.parse(localStorage.getItem("selectedFood"));
    if (!selectedFood) {
      window.location.href = "/menu";
      return;
    }

    setFood(selectedFood);

    let packs = [];
    switch (selectedFood.category) {
      case "Cake":
        packs = [
          { type: "Normal Cake Box", charge: 20 },
          { type: "Ice Box", charge: 50 },
          { type: "Premium Gift Box", charge: 80 },
        ];
        break;

      case "Pizza":
        packs = [
          { type: "Standard Pizza Box", charge: 25 },
          { type: "Thermal Pizza Box", charge: 60 },
          { type: "Extra Large Box", charge: 90 },
        ];
        break;

      case "Biriyani":
        packs = [
          { type: "Plastic Container", charge: 15 },
          { type: "Eco Friendly Box", charge: 35 },
          { type: "Leak-Proof Premium Box", charge: 60 },
        ];
        break;

      default:
        packs = [
          { type: "Basic Packing", charge: 10 },
          { type: "Eco Friendly Packing", charge: 25 },
          { type: "Premium Packing", charge: 40 },
        ];
    }

    setOptions(packs);
  }, []);

  const addToCart = () => {
    if (selectedIndex === null) {
      alert("Please select a packing option");
      return;
    }

    const selectedPacking = options[selectedIndex];
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
      food,
      packing: selectedPacking,
      totalPrice: Number(food.price) + Number(selectedPacking.charge),
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "/cart";
  };

  if (!food) return null;

  return (
    <>
      <Navbar />

      <section className="welcome-section">
        <h3>{food.name}</h3>
        <p>₹{food.price}</p>
      </section>

      <section className="category-section">
        <h3>Choose Packing Type</h3>

        <div className="category-grid">
          {options.map((opt, index) => (
            <div
              key={index}
              className={`food-card ${
                selectedIndex === index ? "selected" : ""
              }`}
              onClick={() => setSelectedIndex(index)}
              style={{ cursor: "pointer" }}
            >
              <h4>{opt.type}</h4>
              <p>Extra ₹{opt.charge}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "0 25px 30px" }}>
        <button
          className="primary-btn"
          style={{ width: "100%" }}
          onClick={addToCart}
        >
          Add to Cart
        </button>
      </section>
    </>
  );
}

export default Packing;
