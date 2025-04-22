"use client";

import { useState } from 'react';
import { LuSend } from "react-icons/lu";
import axios from 'axios';
import { API_URL } from '@/utils/config';

type Props = {
  userId: string;
  chatId: string;
  globalUserData?: any;
  onSend: (message: any) => void;
};

export default function MessageInput({ userId, chatId, globalUserData, onSend }: Props) {
  const [text, setText] = useState<string>('');

  const postMessage = async () => {
    try {
      if (chatId !== "global") {
        const response = await axios.post(`${API_URL}/api/messages`, {
          senderId: userId,
          chatId: chatId,
          text,
        }, {
          withCredentials: true,
        }); 

        console.log("Message posted successfully:", response.data.data);
        onSend(response.data.data); // Send the message to the parent component
      } else {
        onSend({
          _id: "global" + Math.floor(Math.random() * 1000000),
          sender: {
            _id: globalUserData.id,
            username: globalUserData.username,
            profileIcon: globalUserData.profileIcon,
          },
          chat: "global",
          text: text,
          timestamp: new Date(),
          reactions: {},
        });
      }

    } catch (err: any) {
      console.log("Failed to post message:", err.response?.data?.message || err.message, "\nUser ID:", userId, "\nChat ID:", chatId);
    }
  };

  const handleSend = () => {
    if (text.trim()) {
      // onSend(text);
      postMessage();
      setText('');
    }
  };

  return (
    <div className="p-6">
    <div className="flex justify-between w-full pl-4 pr-3 py-2 border border-gray-200 rounded-xl">
      <input
        className="w-full focus:outline-none"
        placeholder="Type here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        className="bg-black text-white rounded-xl px-2 py-2 hover:cursor-pointer"
        onClick={handleSend}
      >
        <LuSend />
      </button>
    </div>
    </div>
  );
}
