"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  const handleGoToGlobalChat = () => {
    router.push("/global"); // Navigate to the global chat page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center gap-6 w-full max-w-lg shadow-lg rounded-lg p-8 bg-white">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="/logo.png" // Replace with the path to your logo
            alt="Chat App Logo"
            className="w-20 h-20"
          />
        </div>

        {/* Welcome Message */}
        <h1 className="text-3xl font-bold text-center">Welcome to ChatApp</h1>
        <p className="text-center text-md text-gray-500">
          Join the global chat and connect with others!
        </p>

        {/* Button to Global Chat */}
        <button
          onClick={handleGoToGlobalChat}
          className="w-full p-3 bg-black text-white font-medium text-lg rounded-lg hover:bg-gray-800 cursor-pointer transition"
        >
          Go to Global Chat
        </button>
      </div>
    </div>
  );
}
