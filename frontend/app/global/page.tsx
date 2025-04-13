"use client";

import ChatSection from "@/components/ChatSection2";
import React from "react";
// import ChatMessages from "./ChatMessages";
// import MessageInput from '@/components/MessageInput';
// import LogoutButton from '@/components/LogoutButton';
import { useSocket } from "@/context/SocketContext";
import { useUser } from '@/hooks/useUser';
// import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

interface userDataToEmit {
  id: string;
  username: string;
  profileIcon: string;
}

export default function GlobalPage() {
  const { messages, sendMessage, sendReaction, socket } = useSocket();
  const { user, loading, setUser } = useUser(false);
  const [guestUsername, setGuestUsername] = useState<string>("");
  // const [email, setEmail] = useState<string>("");
  const [userDataToEmit, setUserDataToEmit] = useState<userDataToEmit | null>(null);
  // const hasFetchedRef = useRef(false);

  useEffect(() => {

    const fetchUserAndEmitUsername = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/auth/me", {
          withCredentials: true,
        });
        setUser(response.data.user); // Update user state
        // setEmail(response.data.user.email); 
        console.log("User fetched successfully:", response.data.user);

      } catch (err: any) {
        console.log("Failed to fetch user:", err.response?.data?.message || err.message);
        
        // Generate a random guest username
        const randomGuestUsername = `Guest${Math.floor(100 + Math.random() * 900)}`;
        setGuestUsername(randomGuestUsername);
        // setEmail(randomGuestUsername);
        console.log("Generated guest username:", randomGuestUsername);
      }
    };

    fetchUserAndEmitUsername();
  }, [socket]);

  useEffect(() => {
    if (user?.username) setUserDataToEmit({ "id": user._id, "username": user.username, "profileIcon": user.profileIcon });  // username);
    else if (guestUsername) setUserDataToEmit({ "id": guestUsername, "username": guestUsername, "profileIcon": "icon" + (Math.floor(Math.random() * 5) + 1) });
  }, [user?.username, guestUsername]);

  useEffect(() => {
    if (socket && socket.connected && userDataToEmit) {
      console.log("Emitting user data:", userDataToEmit);
      // socket.emit("set-username", userDataToEmit);
    }
  }, [socket?.connected, userDataToEmit]);

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
          // username={nameToEmit} 
          // email={email}
          userId={userDataToEmit ? userDataToEmit.id : ""}
          chatId="global"
          globalUserData={userDataToEmit}
        />
      </div>
    </div>
  );
}