"use client";

import ChatSection from "@/components/ChatSection";
import React from "react";
import { useSocket } from '@/context/SocketContext';
import { useUser } from '@/hooks/useUser';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function GeneralPage() {
  const { socket } = useSocket();
  const { user, loading, setUser } = useUser(false);
  const [userId, setUserId] = useState<string>("");
  const [chatId, setChatId] = useState<string>("67fb83e9a40040fd8ff1d680");

  useEffect(() => {

    const fetchUserAndEmitUsername = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/auth/me", {
          withCredentials: true,
        });
        setUser(response.data.user); // Update user state
        console.log("User fetched successfully:", response.data.user);

      } catch (err: any) {
        console.log("Failed to fetch user:", err.response?.data?.message || err.message);
      }
    };

    fetchUserAndEmitUsername();
  }, [socket]);

  useEffect(() => {
    if (user?._id) setUserId(user._id);
  }, [user?._id]);

  if (loading) {
    return <div>Loading...</div>;
  }

return (
    <div className="flex flex-col h-screen bg-gray-100 p-4 gap-4">
      <div className="h-16 w-full bg-white rounded-xl">Navbar</div>
      <div className="flex flex-1 w-full gap-4 overflow-hidden">
        <div className="h-full w-1/4 bg-white rounded-xl">
          Chat list <br />
          (UserId: {userId}) <br />
          (chatId: {chatId})
        </div>
        <ChatSection 
          userId={userId || ""} 
          chatId={chatId}
        />
      </div>
    </div>
  );
}