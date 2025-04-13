"use client";

import React from "react";
import ChatMessages from "./ChatMessages2";
import MessageInput from '@/components/MessageInput2';
// import LogoutButton from '@/components/LogoutButton';
import { useSocket } from '@/context/SocketContext';
// import { useUser } from '@/hooks/useUser';
// import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { BsFillPeopleFill } from "react-icons/bs";

type Message = {
  _id: string;
  sender: {
    _id: string;
    username: string;
    profileIcon: string;
  }
  chat: string; // chatId
  text: string;
  timestamp: Date;
  reactions?: {
    [emoji: string]: string[]; // emoji: array of userIds who reacted
  };
};

export default function ChatSection({ userId, chatId }: { userId: string, chatId: string }) {
  const { messages, sendMessage, sendReaction, socket, setMessages } = useSocket();
  // const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {

    const fetchMessagesByChatId = async () => {
      try {
        const response = await axios.post("http://localhost:3001/api/messages/chatId", {
          chatId 
        }, {
          withCredentials: true,
        });
        console.log("Messages fetched successfully:", response.data.messages);
        // setAllMessages(response.data.messages); // Update messages state
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
          <BsFillPeopleFill className="inline-block mr-2" />
          General Chat ({chatId})
        </div>
        <ChatMessages 
          // username={username} 
          // email={email}
          userId={userId}
          // allMessages={allMessages}
          // setAllMessages={setAllMessages}
          messages={messages}
          setAllMessages={setMessages}
          sendReaction={sendReaction}
        />
        <MessageInput 
          userId={userId}
          chatId={chatId}
          // onSend={(text) => sendMessage({ text, chatId, senderId: userId })}
          onSend={sendMessage}
          setLatestMessage={setLatestMessage}
        />
    </div>
  );
}