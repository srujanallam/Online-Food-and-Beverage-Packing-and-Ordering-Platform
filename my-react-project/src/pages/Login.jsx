import React, { useState } from "react";
import "../styles/main.css";
import "../styles/Login.css";   // ✅ FIXED PATH

function Login({ onLogin }) {
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [adminName, setAdminName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 👤 USER LOGIN
    if (role === "user") {
      if (!name || !mobile) {
        alert("Please enter name and mobile number");
        return;
      }

      if (!/^[0-9]{10}$/.test(mobile)) {
        alert("Enter valid 10-digit mobile number");
        return;
      }

      localStorage.setItem("role", "user");
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ name, mobile })
      );

      alert("User login successful");
      onLogin(); // handled in App.js
    }

    // 🛠 ADMIN LOGIN
    if (role === "admin") {
      if (adminName !== "admin" || password !== "admin123") {
        alert("Invalid admin credentials");
        return;
      }

      localStorage.setItem("role", "admin");
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ name: "Admin" })
      );

      alert("Admin login successful");
      onLogin(); // handled in App.js
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p>Select your role to continue</p>

        {/* ROLE SELECTOR */}
        <div className="role-selector">
          <button
            type="button"
            className={`role-btn ${role === "user" ? "active" : ""}`}
            onClick={() => setRole("user")}
          >
            User
          </button>

          <button
            type="button"
            className={`role-btn ${role === "admin" ? "active" : ""}`}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>

        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit}>
          {role === "user" && (
            <>
              <div className="input-group">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div className="input-group">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter mobile number"
                  maxLength="10"
                />
              </div>
            </>
          )}

          {role === "admin" && (
            <>
              <div className="input-group">
                <label>Admin Name</label>
                <input
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  placeholder="Enter admin name"
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
              </div>
            </>
          )}

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
