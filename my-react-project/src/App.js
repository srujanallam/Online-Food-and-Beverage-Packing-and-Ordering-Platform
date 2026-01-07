import { useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import Menu from "./pages/Menu";
import AdminDashboard from "./pages/AdminDashboard";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import MyOrders from "./pages/MyOrders";
import ManageRestaurants from "./pages/ManageRestaurants";
import ManageFoods from "./pages/ManageFoods";
import ManagePacking from "./pages/ManagePacking";
import ViewOrders from "./pages/ViewOrders";

function App() {
  const [page, setPage] = useState("home");
  const role = localStorage.getItem("role");

  // ---------- HOME ----------
  if (page === "home") return <Home />;

  // ---------- LOGIN ----------
  if (page === "login") {
    return <Login onLogin={() => setPage("dashboard")} />;
  }

  // ---------- ADMIN ----------
  if (role === "admin") {
    switch (page) {
      case "dashboard":
        return <AdminDashboard setPage={setPage} />;
      case "manage-restaurants":
        return <ManageRestaurants />;
      case "manage-foods":
        return <ManageFoods />;
      case "manage-packing":
        return <ManagePacking />;
      case "view-orders":
        return <ViewOrders />;
      default:
        return <AdminDashboard setPage={setPage} />;
    }
  }

  // ---------- USER ----------
  switch (page) {
    case "dashboard":
      return <UserDashboard goToMenu={() => setPage("menu")} />;

    case "menu":
      return <Menu goBack={() => setPage("dashboard")} />;

    case "cart":
      return <Cart />;

    case "checkout":
      return <Checkout />;

    case "payment":
      return <Payment />;

    case "orders":
      return <MyOrders />;

    default:
      return <Login onLogin={() => setPage("dashboard")} />;
  }
}

export default App;
