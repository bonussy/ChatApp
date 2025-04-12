"use client";

import { useEffect, useRef } from "react";

type Message = {
  user: string;
  text: string;
  timestamp: Date;
}; 

type Props = {
  username: string;
  messages: Message[];
};

const formatDate = (timestamp: Date): string => {
  return new Intl.DateTimeFormat('en-GB', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(timestamp)).toUpperCase();
};
  
export default function ChatMessages({ username, messages }: Props) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full gap-4 p-6 overflow-y-auto flex-1 rounded-xl">
      {messages.map((msg, idx) => {
        const isUser = msg.user === username;

        return (
          <div
            key={idx}
            className={`flex flex-col w-fit max-w-[75%] ${
              isUser ? "self-end items-end" : "self-start items-start"
            }`}
          >
            <div className="flex justify-between w-full text-gray-500 gap-2">
              <span className="font-bold text-gray-600">{isUser ? "You" : msg.user}</span>
              <span>{formatDate(msg.timestamp)}</span>
            </div>
            <div
              className={`py-2 px-4 rounded-xl ${
                isUser
                  ? "bg-[#e1f1f8] rounded-tr-none"
                  : "bg-gray-200 rounded-tl-none"
              } text-black`}
            >
              {msg.text}
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
  
  