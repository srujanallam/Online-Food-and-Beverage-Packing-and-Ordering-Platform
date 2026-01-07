import { useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import MyOrders from "./pages/MyOrders";

import AdminDashboard from "./pages/AdminDashboard";
import ManageRestaurants from "./pages/ManageRestaurants";
import ManageFoods from "./pages/ManageFoods";
import ManagePacking from "./pages/ManagePacking";
import ViewOrders from "./pages/ViewOrders";

function App() {
  const [page, setPage] = useState("home");
  const role = localStorage.getItem("role");

  // ---------------- HOME ----------------
  if (page === "home") {
    return <Home setPage={setPage} />;
  }

  // ---------------- LOGIN ----------------
  if (page === "login") {
    return (
      <Login
        onLogin={() => {
          const r = localStorage.getItem("role");
          setPage(r === "admin" ? "admin" : "dashboard");
        }}
      />
    );
  }

  // ---------------- ADMIN ----------------
  if (role === "admin") {
    if (page === "admin") return <AdminDashboard setPage={setPage} />;
    if (page === "manage-restaurants") return <ManageRestaurants setPage={setPage} />;
    if (page === "manage-foods") return <ManageFoods setPage={setPage} />;
    if (page === "manage-packing") return <ManagePacking setPage={setPage} />;
    if (page === "view-orders") return <ViewOrders setPage={setPage} />;
  }

  // ---------------- USER ----------------
  switch (page) {
    case "dashboard":
      return <UserDashboard setPage={setPage} />;

    case "menu":
      return <Menu setPage={setPage} />;

    case "cart":
      return <Cart setPage={setPage} />;

    case "checkout":
      return <Checkout setPage={setPage} />;

    case "payment":
      return <Payment setPage={setPage} />;

    case "orders":
      return <MyOrders setPage={setPage} />;

    default:
      return <Home setPage={setPage} />;
  }
}

export default App;
