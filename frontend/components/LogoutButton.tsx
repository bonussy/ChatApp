"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

export default function LogoutButton() {
  const router = useRouter();
  const { setUser } = useUser(); // Access the setUser function from the hook

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3001/api/auth/logout", {
        withCredentials: true, // Include credentials in the request
      });

      console.log("Logout successful");
      setUser(null);

      // Clear localStorage (if token exists there)
    //   localStorage.removeItem('token');
    //   localStorage.removeItem('userId'); // Remove userId from localStorage

      router.push("/login"); // Redirect to login page after logout
    } catch (err: any) {
      console.error("Logout failed:", err.response?.data?.message || err.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
}