// app/chat/page.tsx
'use client';

import ChatBox from '@/components/ChatBox';
import MessageInput from '@/components/MessageInput';
import LogoutButton from '@/components/LogoutButton';
import { useSocket } from '@/context/SocketContext';
import { useUser } from '@/hooks/useUser';
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function ChatPage() {
  const { messages, sendMessage, socket } = useSocket();
  const { user, loading, setUser } = useUser(false);
  const [guestUsername, setGuestUsername] = useState<string>("");
  const hasFetchedRef = useRef(false);

  // console.log('user in chat: ', user); // Debug line

  useEffect(() => {

    // if(!socket || hasFetchedRef.current) return;

    // hasFetchedRef.current = true;

    const fetchUserAndEmitUsername = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/auth/me", {
          withCredentials: true,
        });
        setUser(response.data.user); // Update user state
        console.log("User fetched successfully:", response.data.user);

        // Emit "set-username" event with the username
        // if (response.data.user && socket) {
        //   console.log(
        //     "Emitting set-username event with username:",
        //     response.data.user.username
        //   );
        //   socket.emit("set-username", response.data.user.username);
        // }
      } catch (err: any) {
        console.log("Failed to fetch user:", err.response?.data?.message || err.message);
        
        // Generate a random guest username
        const randomGuestUsername = `Guest${Math.floor(100 + Math.random() * 900)}`;
        setGuestUsername(randomGuestUsername);
      }
    };

    fetchUserAndEmitUsername();
  }, [socket]);

  useEffect(() => {
    if (socket && socket.connected && user?.username) {
      console.log("Socket connected, emitting username:", user.username);
      socket.emit("set-username", user.username);
    }
  }, [socket, socket?.connected, user?.username]);
  

  useEffect(() => {
    if (guestUsername && socket) {
      console.log("Emitting set-username for guest:", guestUsername);
      socket.emit("set-username", guestUsername);
    }
  }, [guestUsername, socket]);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md h-[600px] bg-white shadow-lg rounded-lg flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Chat</h2>
          <LogoutButton />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <ChatBox messages={messages} />
        </div>
        <div className="border-t p-4">
          <MessageInput onSend={(text) => sendMessage({ text })} />
        </div>
      </div>
    </div>
  );
}
