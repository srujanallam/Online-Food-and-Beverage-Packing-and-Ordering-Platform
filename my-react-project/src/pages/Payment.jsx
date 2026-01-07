import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/main.css";
import "../styles/user.css";

function Payment() {
  const [method, setMethod] = useState("COD");

  useEffect(() => {
    const role = localStorage.getItem("role");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const address = JSON.parse(localStorage.getItem("addressInfo"));

    if (role !== "user") {
      window.location.href = "/";
      return;
    }

    if (cart.length === 0 || !address) {
      alert("Invalid order flow");
      window.location.href = "/cart";
    }
  }, []);

  const payNow = () => {
    if (method === "UPI") alert("✅ Demo UPI payment successful");
    else if (method === "CARD") alert("✅ Demo Card payment successful");
    else alert("✅ Cash on Delivery selected");

    confirmOrder();
  };

  const confirmOrder = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const address = JSON.parse(localStorage.getItem("addressInfo"));
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const deliveryCharge = Number(localStorage.getItem("deliveryCharge")) || 0;

    let cartTotal = 0;
    cart.forEach((item) => {
      cartTotal += item.totalPrice ?? (item.food.price + item.packing.charge);
    });

    const order = {
      orderId: Date.now(),
      user,
      items: cart,
      address,
      cartTotal,
      deliveryCharge,
      grandTotal: cartTotal + deliveryCharge,
      status: "Order Placed",
      orderDate: new Date().toLocaleString(),
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Clear cart only
    localStorage.removeItem("cart");

    alert("🎉 Order placed successfully!");
    window.location.href = "/my-orders";
  };

  return (
    <>
      <Navbar />

      <section className="category-section">
        <h3>Select Payment Method</h3>

        <div className="category-card">
          <label className="radio-option">
            <input
              type="radio"
              checked={method === "COD"}
              onChange={() => setMethod("COD")}
            />
            Cash on Delivery
          </label>

          <label className="radio-option">
            <input
              type="radio"
              checked={method === "UPI"}
              onChange={() => setMethod("UPI")}
            />
            UPI (Demo)
          </label>

          <label className="radio-option">
            <input
              type="radio"
              checked={method === "CARD"}
              onChange={() => setMethod("CARD")}
            />
            Card (Demo)
          </label>
        </div>
      </section>

      <section style={{ padding: "0 25px 40px" }}>
        <button
          className="primary-btn"
          style={{ width: "100%" }}
          onClick={payNow}
        >
          Pay & Place Order
        </button>
      </section>
    </>
  );
}

export default Payment;
