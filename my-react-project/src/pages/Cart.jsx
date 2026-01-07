import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/main.css";
import "../styles/user.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // AUTH + LOAD CART
  useEffect(() => {
    if (localStorage.getItem("role") !== "user") {
      window.location.href = "/";
      return;
    }

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    calculateTotal(storedCart);
  }, []);

  // TOTAL CALCULATION
  const calculateTotal = (items) => {
    let sum = 0;
    items.forEach((item) => {
      sum +=
        item.totalPrice ??
        (Number(item.food.price) + Number(item.packing.charge));
    });
    setTotal(sum);
  };

  // REMOVE ITEM
  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    calculateTotal(updatedCart);
  };

  const goToCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }
    window.location.href = "/checkout";
  };

  return (
    <>
      <Navbar />

      <section className="category-section">
        <h3>Your Cart</h3>

        {cart.length === 0 && (
          <p style={{ textAlign: "center", color: "#666" }}>
            Your cart is empty 🍽️
          </p>
        )}

        {cart.map((item, index) => (
          <div className="category-card cart-item" key={index}>
            <div className="cart-left">
              <h4>{item.food.name}</h4>
              <p>Food Price: ₹{item.food.price}</p>
              <p>Packing: {item.packing.type}</p>
              <p>Packing Charge: ₹{item.packing.charge}</p>
            </div>

            <div className="cart-right">
              <div className="cart-total">
                ₹
                {item.totalPrice ??
                  item.food.price + item.packing.charge}
              </div>

              <button
                className="remove-btn"
                onClick={() => removeItem(index)}
              >
                ❌
              </button>
            </div>
          </div>
        ))}

        {cart.length > 0 && (
          <>
            <div style={{ marginTop: "20px", fontWeight: "600" }}>
              Total Amount: ₹{total}
            </div>

            <button
              className="primary-btn"
              style={{ width: "100%", marginTop: "15px" }}
              onClick={goToCheckout}
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </section>
    </>
  );
}

export default Cart;
