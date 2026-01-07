import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/main.css";
import "../styles/user.css";

function Checkout() {
  const [user, setUser] = useState(null);
  const [area, setArea] = useState("");
  const [charge, setCharge] = useState(0);
  const [form, setForm] = useState({
    houseNo: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    const role = localStorage.getItem("role");
    const userData = JSON.parse(localStorage.getItem("loggedInUser"));
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (role !== "user" || !userData) {
      window.location.href = "/";
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      window.location.href = "/cart";
      return;
    }

    setUser(userData);
  }, []);

  // DELIVERY CHARGE LOGIC
  useEffect(() => {
    switch (area) {
      case "nearby":
        setCharge(30);
        break;
      case "mid":
        setCharge(50);
        break;
      case "far":
        setCharge(70);
        break;
      default:
        setCharge(0);
    }
  }, [area]);

  const proceedToPayment = () => {
    if (!form.houseNo || !area || !form.city || !form.pincode) {
      alert("Please fill all delivery details");
      return;
    }

    if (!/^[0-9]{6}$/.test(form.pincode)) {
      alert("Please enter a valid 6-digit pincode");
      return;
    }

    const addressInfo = {
      name: user.name,
      mobile: user.mobile,
      houseNo: form.houseNo,
      area,
      city: form.city,
      pincode: form.pincode,
      deliveryCharge: charge,
    };

    localStorage.setItem("addressInfo", JSON.stringify(addressInfo));
    localStorage.setItem("deliveryCharge", charge);

    window.location.href = "/payment";
  };

  if (!user) return null;

  return (
    <>
      <Navbar />

      <section className="category-section">
        <h3>Delivery Details</h3>

        <div className="category-card checkout-card">
          <div className="checkout-grid">
            <div className="input-group">
              <label>Name</label>
              <input value={user.name} readOnly />
            </div>

            <div className="input-group">
              <label>Mobile Number</label>
              <input value={user.mobile} readOnly />
            </div>

            <div className="input-group">
              <label>House / Flat No</label>
              <input
                placeholder="Enter house number"
                value={form.houseNo}
                onChange={(e) =>
                  setForm({ ...form, houseNo: e.target.value })
                }
              />
            </div>

            <div className="input-group">
              <label>Area</label>
              <select value={area} onChange={(e) => setArea(e.target.value)}>
                <option value="">Select Area</option>
                <option value="nearby">Nearby</option>
                <option value="mid">Mid Range</option>
                <option value="far">Far</option>
              </select>
            </div>

            <div className="input-group">
              <label>City</label>
              <input
                placeholder="Enter city"
                value={form.city}
                onChange={(e) =>
                  setForm({ ...form, city: e.target.value })
                }
              />
            </div>

            <div className="input-group">
              <label>Pincode</label>
              <input
                placeholder="Enter pincode"
                value={form.pincode}
                onChange={(e) =>
                  setForm({ ...form, pincode: e.target.value })
                }
              />
            </div>
          </div>

          <div style={{ marginTop: "15px", fontWeight: "600" }}>
            Delivery Charge: ₹{charge}
          </div>
        </div>

        <button
          className="primary-btn"
          style={{ width: "100%", marginTop: "20px" }}
          onClick={proceedToPayment}
        >
          Proceed to Payment
        </button>
      </section>
    </>
  );
}

export default Checkout;
