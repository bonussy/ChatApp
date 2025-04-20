"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddChat = ({
  currentUser,
  parentUser,
}: {
  currentUser: string;
  parentUser: string;
}) => {
  const router = useRouter();

  const handleAddChat = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/chat", {
        members: [currentUser, parentUser],
      });

      console.log("Chat created successfully", response.data);
      router.push("/general"); // Redirect to /general page
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  return (
    <div className="ml-4 text-gray-500 cursor-pointer" onClick={handleAddChat}>
      +
    </div>
  );
};

export default AddChat;
