"use client";

import React from "react";
import ChatMessages from "./ChatMessages";
import MessageInput from '@/components/MessageInput';
import { useSocket } from '@/context/SocketContext';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { BsFillPeopleFill } from "react-icons/bs";
import { FaGlobeAsia } from "react-icons/fa";

export default function ChatSection({ userId, chatId, chatName, chatMemberCount, globalUserData }: { userId: string, chatId: string, chatName?: string, chatMemberCount?: number, globalUserData?: any }) {
  const { messages, sendMessage, sendReaction, setMessages } = useSocket();

  useEffect(() => {

    const fetchMessagesByChatId = async () => {
      try {
        const response = await axios.post("http://localhost:3001/api/messages/chatId", {
          chatId 
        }, {
          withCredentials: true,
        });
        console.log("Messages fetched successfully:", response.data.messages);
        setMessages(response.data.messages); // Update messages state
      } catch (err: any) {
        console.log("Failed to fetch messages:", err.response?.data?.message || err.message, "\nChat ID:", chatId);
      }
    };

    fetchMessagesByChatId();
  }, [chatId]);

  useEffect(() => {
    console.log("All messages:", messages);
  }, [messages]);

return (
    <div className="flex flex-1 flex-col h-full w-3/4 bg-white rounded-xl">
        <div className="flex items-center p-4 border-b border-gray-200 text-xl font-bold">
          { (chatId != "global") ? <BsFillPeopleFill className="inline-block mr-2" /> : <FaGlobeAsia className="inline-block mr-2" />}
          { (chatId != "global") ? `${chatName} (${chatMemberCount})` : "Global Chat"}
        </div>
        <ChatMessages 
          userId={userId}
          chatId={chatId}
          messages={messages}
          globalUserData={globalUserData}
          sendReaction={sendReaction}
        />
        <MessageInput 
          userId={userId}
          chatId={chatId}
          globalUserData={globalUserData}
          onSend={sendMessage}
        />
    </div>
  );
}