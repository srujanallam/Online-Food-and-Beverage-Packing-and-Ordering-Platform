import { useEffect } from "react";

export default function useAdminAuth() {
  useEffect(() => {
    const role = localStorage.getItem("role");
    const adminData = JSON.parse(localStorage.getItem("loggedInUser"));

    if (role !== "admin" || !adminData) {
      window.location.href = "/login";
    }
  }, []);
}
