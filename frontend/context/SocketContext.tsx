"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

type Message = {
  user: string;
  text: string;
  timestamp: Date;
};

type SocketContextType = {
  socket: Socket | null;
  sendMessage: (message: { text: string }) => void;
  messages: Message[]; // Collect chat messages with usernames
};

const SocketContext = createContext<SocketContextType>({
  socket: null, // no connection at beginning
  sendMessage: () => {}, // update later
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

  return (
    <SocketContext.Provider value={{ socket, sendMessage, messages }}>
      {children}
    </SocketContext.Provider>
  );
};
