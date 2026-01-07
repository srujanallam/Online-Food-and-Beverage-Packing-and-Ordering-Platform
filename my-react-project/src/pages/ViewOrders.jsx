import React, { useEffect, useState } from "react";
import "../styles/main.css";
import "../styles/admin.css";

function ViewOrders({ setPage }) {
  const [orders, setOrders] = useState([]);

  // 🔐 ADMIN AUTH + LOAD ORDERS
  useEffect(() => {
    const role = localStorage.getItem("role");
    const admin = JSON.parse(localStorage.getItem("loggedInUser"));

    if (role !== "admin" || !admin) {
      setPage("login");
      return;
    }

    setOrders(JSON.parse(localStorage.getItem("orders")) || []);
  }, [setPage]);

  return (
    <div className="admin-dashboard">
      {/* NAVBAR */}
      <header className="navbar">
        <h2 onClick={() => setPage("admin")} style={{ cursor: "pointer" }}>
          ⬅ View Orders
        </h2>
        <button
          onClick={() => {
            localStorage.clear();
            setPage("login");
          }}
        >
          Logout
        </button>
      </header>

      {/* ORDERS LIST */}
      <section className="category-section">
        <h3>All Orders</h3>

        {orders.length === 0 && (
          <p style={{ color: "#777" }}>No orders placed yet.</p>
        )}

        {orders.map(order => (
          <div
            className="category-card"
            key={order.orderId}
            style={{ marginBottom: "20px" }}
          >
            <h4>Order ID: #{order.orderId}</h4>

            <p>
              <strong>User:</strong> {order.user.name} ({order.user.mobile})
            </p>

            <p>
              <strong>Items:</strong>
            </p>

            <ul>
              {order.items.map((i, idx) => (
                <li key={idx}>
                  {i.food.name} – ₹{i.food.price} <br />
                  Packing: {i.packing.type} (₹{i.packing.charge})
                </li>
              ))}
            </ul>

            <p>
              <strong>Cart Total:</strong> ₹{order.cartTotal}
            </p>
            <p>
              <strong>Delivery Charge:</strong> ₹{order.deliveryCharge}
            </p>
            <p style={{ fontWeight: "600" }}>
              Grand Total: ₹{order.grandTotal}
            </p>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <p style={{ fontSize: "13px", color: "#777" }}>
              Ordered on: {order.orderDate}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ViewOrders;
