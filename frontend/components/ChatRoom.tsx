// components/ChatRoom.tsx
"use client"
import React from 'react';
import { useSocket } from '../context/SocketContext';

const ChatRoom: React.FC = () => {
  const { messages } = useSocket();

  return (
    <div className="chat-room">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatRoom;
