"use client";

import React from "react";
import ChatMessages from "./ChatMessages";
import MessageInput from '@/components/MessageInput';
// import LogoutButton from '@/components/LogoutButton';
import { useSocket } from '@/context/SocketContext';
// import { useUser } from '@/hooks/useUser';
// import { useRouter } from "next/navigation";
// import { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
import { FaGlobeAsia } from "react-icons/fa";

export default function ChatSection({ username }: { username: string }) {
  const { messages, sendMessage, socket } = useSocket();
  // const { user, loading, setUser } = useUser(false);
  // const [guestUsername, setGuestUsername] = useState<string>("");
  // const hasFetchedRef = useRef(false);

  // useEffect(() => {

  //   const fetchUserAndEmitUsername = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3001/api/auth/me", {
  //         withCredentials: true,
  //       });
  //       setUser(response.data.user); // Update user state
  //       console.log("User fetched successfully:", response.data.user);

  //     } catch (err: any) {
  //       console.log("Failed to fetch user:", err.response?.data?.message || err.message);
        
  //       // Generate a random guest username
  //       const randomGuestUsername = `Guest${Math.floor(100 + Math.random() * 900)}`;
  //       setGuestUsername(randomGuestUsername);
  //     }
  //   };

  //   fetchUserAndEmitUsername();
  // }, [socket]);

  // useEffect(() => {
  //   if (socket && socket.connected && user?.username) {
  //     console.log("Socket connected, emitting username:", user.username);
  //     socket.emit("set-username", user.username);
  //   }
  // }, [socket, socket?.connected, user?.username]);
  

  // useEffect(() => {
  //   if (guestUsername && socket) {
  //     console.log("Emitting set-username for guest:", guestUsername);
  //     socket.emit("set-username", guestUsername);
  //   }
  // }, [guestUsername, socket]);
  

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

return (
    <div className="flex flex-1 flex-col h-full w-3/4 bg-white rounded-xl">
        <div className="flex items-center p-4 border-b border-gray-200 text-xl font-bold">
          <FaGlobeAsia className="inline-block mr-2" />
          Global Chat
        </div>
        <ChatMessages messages={messages} username={username} />
        <MessageInput onSend={(text) => sendMessage({ text })} />
    </div>
  );
}