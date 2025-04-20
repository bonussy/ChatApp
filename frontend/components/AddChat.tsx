"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { API_URL } from "@/utils/config";

const AddChat = ({
  currentUser,
  parentUser,
}: {
  currentUser: string|undefined;
  parentUser: string;
}) => {
  const router = useRouter();

  const handleAddChat = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/chat`, {
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
