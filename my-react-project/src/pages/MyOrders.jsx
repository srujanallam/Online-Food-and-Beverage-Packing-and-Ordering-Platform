import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/main.css";
import "../styles/user.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (role !== "user" || !user) {
      window.location.href = "/";
      return;
    }

    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const filteredOrders = allOrders.filter(
      (o) => o.user?.mobile === user.mobile
    );

    setOrders(filteredOrders.reverse());
  }, []);

  return (
    <>
      <Navbar />

      <section className="category-section">
        <h3>My Orders</h3>

        {orders.length === 0 && (
          <p style={{ textAlign: "center", color: "#666" }}>
            You haven’t placed any orders yet 🍽️
          </p>
        )}

        {orders.map((order) => (
          <div className="category-card order-card" key={order.orderId}>
            <div className="order-header">
              <strong>Order ID: #{order.orderId}</strong>
              <span className="order-status">{order.status}</span>
            </div>

            <p className="order-date">{order.orderDate}</p>

            <ul className="order-items">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.food.name} – ₹{item.totalPrice}
                </li>
              ))}
            </ul>

            <div className="order-footer">
              <span>Delivery: ₹{order.deliveryCharge}</span>
              <span className="order-total">
                ₹{order.grandTotal}
              </span>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default MyOrders;
