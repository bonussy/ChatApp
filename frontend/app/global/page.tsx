"use client";

import ChatSection from "@/components/ChatSection";
import React from "react";
// import ChatMessages from "./ChatMessages";
// import MessageInput from '@/components/MessageInput';
// import LogoutButton from '@/components/LogoutButton';
import { useSocket } from '@/context/SocketContext';
import { useUser } from '@/hooks/useUser';
// import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function GlobalPage() {
  const { messages, sendMessage, sendReaction, socket } = useSocket();
  const { user, loading, setUser } = useUser(false);
  const [guestUsername, setGuestUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nameToEmit, setNameToEmit] = useState<string>("");
  // const hasFetchedRef = useRef(false);

  useEffect(() => {

    const fetchUserAndEmitUsername = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/auth/me", {
          withCredentials: true,
        });
        setUser(response.data.user); // Update user state
        setEmail(response.data.user.email); 
        console.log("User fetched successfully:", response.data.user);

      } catch (err: any) {
        console.log("Failed to fetch user:", err.response?.data?.message || err.message);
        
        // Generate a random guest username
        const randomGuestUsername = `Guest${Math.floor(100 + Math.random() * 900)}`;
        setGuestUsername(randomGuestUsername);
        setEmail(randomGuestUsername);
        console.log("Generated guest username:", randomGuestUsername);
      }
    };

    fetchUserAndEmitUsername();
  }, [socket]);

  useEffect(() => {
    if (user?.username) setNameToEmit(user.username);
    else if (guestUsername) setNameToEmit(guestUsername);
  }, [user?.username, guestUsername]);

  useEffect(() => {
    if (socket && socket.connected && nameToEmit) {
      console.log("Emitting username:", nameToEmit);
      socket.emit("set-username", nameToEmit);
    }
  }, [socket?.connected, nameToEmit]);

  if (loading) {
    return <div>Loading...</div>;
  }

return (
    <div className="flex flex-col h-screen bg-gray-100 p-4 gap-4">
      <div className="h-16 w-full bg-white rounded-xl">Navbar</div>
      <div className="flex flex-1 w-full gap-4 overflow-hidden">
        <div className="h-full w-1/4 bg-white rounded-xl">
          Chat list
        </div>
        <ChatSection 
          username={nameToEmit} 
          email={email}
        />
      </div>
    </div>
  );
}