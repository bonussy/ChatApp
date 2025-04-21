"use client";
import React, {useState} from "react";
import axios from 'axios';
import { useRouter } from "next/navigation"; // Next.js router
import { useSocket } from "@/context/SocketContext";
import { useUser } from "@/hooks/useUser";
import { API_URL } from "@/utils/config";

export default function LoginPage(){
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const { socket } = useSocket();
  const { user, setUser } = useUser(false); 
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true, // Include credentials in the request
        }
      );

      console.log("Login successful:", response.data);

      // 🔁 รอ ping /me ให้แน่ใจว่า cookie ทำงานแล้ว
      const meResponse = await axios.get(`${API_URL}/api/auth/me`, {
        withCredentials: true,
      });

      console.log("User verified:", meResponse.data);


      router.push("/general"); // Redirect to general chat page
    } catch (err: any) {
      console.error("Login failed:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleBackToGlobal = () => {
    router.push("/global"); // Navigate back to the global page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col gap-5 w-full max-w-lg shadow-lg rounded-lg py-6 px-8 bg-white">
        {/* Back Arrow */}
        <button
          onClick={handleBackToGlobal}
          className="flex items-center gap-1 text-gray-400 hover:underline mb-4 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Back to Global
        </button>
        
        {/* Logo */}
        <div className="flex justify-center mt-4">
          <img
            src="/logo.png" // Replace with the path to your logo
            alt="Chat App Logo"
            className="w-25 h-25"
          />
        </div>
        
        <div className="mb-3">
          <h1 className="text-3xl font-bold text-center mb-2">Log In</h1>
          <p className="text-center text-md text-gray-500">Welcome back! Please enter your details.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
            <div className="flex flex-col mb-2.5 gap-2 ">
              <label className="text-md font-medium mb-1 ">Email:</label>
              <input
                type="email"
                value={email}
                placeholder="your@email.com"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col mb-2.5 gap-2 ">
              <label className="text-md font-medium mb-1 ">Password:</label>
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
              Login
            </button>
          
        </form>

        {/* Register Link */}
        <p className="text-center text-sm mt-4">
          Don't you have an account?{" "}
          <a
            href="/register"
            className="text-blue-500 hover:underline"
          >
            Go to Register
          </a>
        </p>
        

      </div>
    </div>

  );
};