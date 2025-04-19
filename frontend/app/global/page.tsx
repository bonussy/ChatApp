"use client";

import ChatSection from "@/components/ChatSection";
import React from "react";
import { useSocket } from "@/context/SocketContext";
import { useUser } from "@/hooks/useUser";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import NavBar from "@/components/NavBar";
import OnlineUsers from "@/components/OnlineUsers";

interface userDataToEmit {
  id: string;
  username: string;
  profileIcon: string;
}

export default function GlobalPage() {
  const { socket } = useSocket();
  const { user, loading, setUser } = useUser(false);
  const [guestUsername, setGuestUsername] = useState<string>("");
  const [userDataToEmit, setUserDataToEmit] = useState<userDataToEmit | null>(
    null
  );

  useEffect(() => {
    const fetchUserAndEmitUsername = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/auth/me", {
          withCredentials: true,
        });
        setUser(response.data.user); // Update user state
        console.log("User fetched successfully:", response.data.user);
      } catch (err: any) {
        console.log(
          "Failed to fetch user:",
          err.response?.data?.message || err.message
        );

        // Generate a random guest username
        const randomGuestUsername = `Guest${Math.floor(
          100 + Math.random() * 900
        )}`;
        setGuestUsername(randomGuestUsername);
        console.log("Generated guest username:", randomGuestUsername);
      }
    };

    fetchUserAndEmitUsername();
  }, [socket]);

  useEffect(() => {
    if (user?.username)
      setUserDataToEmit({
        id: user._id,
        username: user.username,
        profileIcon: user.profileIcon,
      });
    // username);
    else if (guestUsername)
      setUserDataToEmit({
        id: guestUsername,
        username: guestUsername,
        profileIcon: "icon" + (Math.floor(Math.random() * 5) + 1),
      });
  }, [user?.username, guestUsername]);

  useEffect(() => {
    if (socket && socket.connected && userDataToEmit) {
      console.log("Emitting user data:", userDataToEmit);
      // socket.emit("set-username", userDataToEmit);
    }
  }, [socket?.connected, userDataToEmit]);

  if (loading) {
    // return <div>Loading...</div>;
    return (
      <div
        role="status"
        className="flex h-screen w-full justify-center items-center"
      >
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4 gap-4">
      <div className="flex h-16 w-full bg-white rounded-xl items-center">
        <NavBar user={user} />
      </div>
      <div className="flex flex-1 w-full gap-4 overflow-hidden">
        <div className="h-full w-1/4 bg-white rounded-xl">
          <OnlineUsers />
        </div>
        <ChatSection
          userId={userDataToEmit ? userDataToEmit.id : ""}
          chatId="global"
          globalUserData={userDataToEmit}
        />
      </div>
    </div>
  );
}
