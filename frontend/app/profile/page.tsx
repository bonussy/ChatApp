"use client";

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { API_URL } from "@/utils/config";

export default function ProfilePage() {
  const [username, setUsername] = useState<string>("");
  const [selectedIcon, setSelectedIcon] = useState<string>("icon1");
  const [loading, setLoading] = useState<boolean>(false);

  const icons = [
    { id: "icon1", src: "/profile/blue_paw.svg", alt: "Icon 1" },
    { id: "icon2", src: "/profile/green_paw.svg", alt: "Icon 2" },
    { id: "icon3", src: "/profile/purple_paw.svg", alt: "Icon 3" },
    { id: "icon4", src: "/profile/red_paw.svg", alt: "Icon 4" },
    { id: "icon5", src: "/profile/yellow_paw.svg", alt: "Icon 5" },
  ];

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/me`, {
          withCredentials: true, // Include credentials (cookies) in the request
        });

        const { username, profileIcon } = response.data.user;
        setUsername(username); // Set the real username
        setSelectedIcon(profileIcon || "icon1"); // Set the real profile icon or default to "icon1"
      } catch (err: any) {
        console.error("Error fetching user data:", err.response?.data?.message || err.message);
      }
    };

    fetchUserData();
  }, []);

  const handleIconChange = (iconId: string) => {
    setSelectedIcon(iconId);
  };

  const handleNameChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }

  const handleSave = async () => {
    setLoading(true);

    try{
      const response = await axios.put(
        `${API_URL}/api/user/update`,
        {
          username: username,
          profileIcon: selectedIcon
        },
        {
          withCredentials: true // Include credentials (cookies) in the request
        }
      );

      console.log("Profile updated successfully:", response.data);
    } catch (err: any){
      console.error("Error updating profile:", err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectedIconSrc = icons.find((icon) => icon.id === selectedIcon)?.src;


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col gap-4 w-full max-w-lg shadow-lg rounded-lg p-6 bg-white">
        <h1 className="text-2xl font-bold mb-4">Profile Management</h1>

        {/* Display Selected Profile Icon */}
        <div className="flex flex-col items-center mb-6">
          {/* <h2 className="text-lg text-gray-500 font-semibold mb-2">Your Profile Icon</h2> */}
          {selectedIconSrc && (
            <img
              src={selectedIconSrc}
              alt="Selected Icon"
              className="w-40 h-40 rounded-full border-4 border-gray-200 shadow-md"
            />
          )}
        </div>
        
        {/* Profile Icon Selection */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Choose Your Profile Icon</h2>
          <div className="flex gap-4 justify-center">
            {icons.map((icon) => (
              <div
                key={icon.id}
                className={`w-16 h-16 rounded-full cursor-pointer border-2 flex items-center justify-center border-solid ${
                  selectedIcon === icon.id ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => handleIconChange(icon.id)}
              >
                <img src={icon.src} alt={icon.alt} className="w-16 h-16" />
              </div>
            ))}
          </div>
        </div>

         {/* Username Input */}
         <div className="mb-6 flex gap-4 items-center">
          <label htmlFor="username" className="text-lg font-medium mb-1 text-center">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleNameChange}
            className="w-full p-2 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full p-2 bg-black text-white rounded-lg hover:bg-gray-800 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </div>
    </div>
  );
}