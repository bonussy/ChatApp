"use client";

import React from "react";
import ChatMessages from "./ChatMessages";
import MessageInput from '@/components/MessageInput';
import { useSocket } from '@/context/SocketContext';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { BsFillPeopleFill } from "react-icons/bs";
import { FaGlobeAsia } from "react-icons/fa";
import { API_URL } from "@/utils/config";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function ChatSection({ userId, chatId, chatName, chatMemberCount, globalUserData, isGroupChat, setSelectedUser }: { userId: string, chatId: string, chatName?: string, chatMemberCount?: number, globalUserData?: any, isGroupChat?: boolean, setSelectedUser?: React.Dispatch<React.SetStateAction<any>> }) {
  const { messages, sendMessage, sendReaction, setMessages } = useSocket();

  useEffect(() => {

    const fetchMessagesByChatId = async () => {
      try {
        if (chatId == "global") {
          console.log("Global chat selected, no messages to fetch.");
          return;
        }
        if (chatId.substring(0, 4) == "ping") {
          console.log("Ping chat selected, no messages to fetch.");
          return;
        }
        if (chatId == "") { return; }
        const response = await axios.post(`${API_URL}/api/messages/chatId`, {
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

if (chatId == "") {
  return (
    <div className="flex justify-center items-center h-full w-3/4 bg-white rounded-xl text-2xl text-gray-400">
      {/* <div className="flex items-center p-4 border-b border-gray-200 text-xl font-bold"> */}
        Select a chat to start messaging
        <IoChatbubbleEllipses className="inline-block ml-2" />
      {/* </div> */}
    </div>
  );
}


return (
    <div className="flex flex-1 flex-col h-full w-3/4 bg-white rounded-xl">
        <div className="flex items-center p-4 border-b border-gray-200 text-xl font-bold">
          <div className="flex items-center justify-center">
            { (chatId != "global") ? <BsFillPeopleFill className="inline-block mr-2" /> : <FaGlobeAsia className="inline-block mr-2" />}
            { (chatId.substring(0, 4) == "ping") ? "Ping Chat | " : "" }
            { (chatId != "global") ? `${chatName} ${ isGroupChat ? "(" + chatMemberCount + ")" : ""}` : "Global Chat"}
          </div>
          {
            (chatId.substring(0, 4) == "ping" && setSelectedUser) && 
            <IoMdArrowRoundBack 
              className="ml-auto cursor-pointer text-gray-400 hover:text-gray-600" 
              onClick = {() => setSelectedUser(null)}
            />
          }
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