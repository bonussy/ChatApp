"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Next.js router

export default function RegisterPage() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true, // Include credentials in the request
        }
      );

      console.log("Registration successful:", response.data);
      router.push("/login"); // Redirect to login page after successful registration
    } catch (err: any) {
      console.error("Registration failed:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col gap-5 w-full max-w-lg shadow-lg rounded-lg py-6 px-8 bg-white">
        {/* Logo */}
        <div className="flex justify-center mt-4">
          <img
            src="/logo.png" // Replace with the path to your logo
            alt="Chat App Logo"
            className="w-25 h-25"
          />
        </div>

        <div className="mb-4">
          <h1 className="text-3xl font-bold text-center mb-2">Register</h1>
          <p className="text-center text-md text-gray-500">Create your account to get started.</p>
        </div>

        {/* {error && <p className="text-center text-red-500">{error}</p>} */}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col mb-2.5 gap-2">
            <label className="text-md font-medium mb-1">Username:</label>
            <input
              type="text"
              value={username}
              placeholder="your username"
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col mb-2.5 gap-2">
            <label className="text-md font-medium mb-1">Email:</label>
            <input
              type="email"
              value={email}
              placeholder="your@email.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col mb-2.5 gap-2">
            <label className="text-md font-medium mb-1">Password:</label>
            <input
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 mt-2 bg-black text-white font-medium text-lg rounded-2xl hover:bg-gray-800 cursor-pointer"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Go to Login
          </a>
        </p>
      </div>
    </div>
  );
}