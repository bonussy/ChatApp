"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

type Message = {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
  reactions?: {
    [emoji: string]: string[]; // emoji: array of emails who reacted
  };
};

type SocketContextType = {
  socket: Socket | null;
  sendMessage: (message: { text: string }) => void;
  sendReaction: (payload: {
    messageId: string;
    emoji: string;
    email: string;
  }) => void;
  messages: Message[]; // Collect chat messages with usernames
};

const SocketContext = createContext<SocketContextType>({
  socket: null, // no connection at beginning
  sendMessage: () => {}, // update later
  sendReaction: () => {}, // update later
  messages: [],
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  // const { user } = useUser();

  useEffect(() => {
    console.log('Initializing socket connection...');
    const newSocket = io('http://localhost:3001', { withCredentials: true });
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);

      // Emit "set-username" event with the token from localStorage
      // const token = localStorage.getItem("token");
      // if (token) {
      //   console.log('Emitting set-username event with token:', token);
      //   newSocket.emit('set-username', token);
      // } else {
      //   console.log('Token is missing in cookies');
      // }
    });

    newSocket.on('message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on("message:reaction", ({ messageId, emoji, username }) => {
      setMessages((prevMessages) => {
        return prevMessages.map((msg) => {
          if (msg.id !== messageId) return msg;
    
          const updatedReactions = { ...msg.reactions };
          const userList = updatedReactions[emoji] || [];
    
          if (userList.includes(username)) {
            updatedReactions[emoji] = userList.filter((u) => u !== username);
            if (updatedReactions[emoji].length === 0) {
              delete updatedReactions[emoji];
            }
          } else {
            updatedReactions[emoji] = [...userList, username];
          }
    
          return { ...msg, reactions: updatedReactions };
        });
      });
    });
    
    return () => {
      console.log('Disconnecting socket...');
      newSocket.disconnect();
    };
  }, []); // Add user as a dependency to reinitialize the socket when the user changes

  const sendMessage = (message: { text: string }) => {
    if (socket) {
      socket.emit('message', message); // Send message to the backend
    }
  };

  const sendReaction = (payload: {
    messageId: string;
    emoji: string;
    email: string;
  }) => {
    if (socket) {
      socket.emit("message:reaction", payload);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, sendMessage, sendReaction, messages }}>
      {children}
    </SocketContext.Provider>
  );
};
