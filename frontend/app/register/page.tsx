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
    <div className="w-[400px] p-5">
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="flex mb-2.5 gap-2">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            placeholder="Your username"
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 mt-1"
          />
        </div>
        <div className="flex mb-2.5 gap-2">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            placeholder="your@email.com"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 mt-1"
          />
        </div>
        <div className="flex mb-2.5 gap-2">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 mt-1"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2.5 border-2 rounded-2xl cursor-pointer"
        >
          Register
        </button>
      </form>
    </div>
  );
}