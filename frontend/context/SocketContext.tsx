"use client";

import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { API_URL } from "@/utils/config";

export type Message = {
  _id: string;
  sender: {
    _id: string;
    username: string;
    profileIcon: string;
  };
  chat: string; // chatId
  text: string;
  timestamp: Date;
  reactions?: {
    [emoji: string]: string[]; // emoji: array of userIds who reacted
  };
};

type userDataToEmit = {
  id: string;
  username: string;
  profileIcon: string;
};

type SocketContextType = {
  socket: Socket | null;
  sendMessage: (message: Message) => void;
  sendReaction: (payload: {
    messageId: string;
    emoji: string;
    userId: string;
  }) => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  onlineUsers: userDataToEmit[];
  setOnlineUsers: React.Dispatch<React.SetStateAction<userDataToEmit[]>>;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  sendMessage: () => {},
  sendReaction: () => {},
  messages: [],
  setMessages: () => {},
  onlineUsers: [],
  setOnlineUsers: () => {},
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<userDataToEmit[]>([]);

  useEffect(() => {
    const newSocket = io(`${API_URL}`, { withCredentials: true });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on("message:reaction", ({ messageId, emoji, userId }) => {
      setMessages((prevMessages) => {
        return prevMessages.map((msg) => {
          if (msg._id !== messageId) return msg;

          const updatedReactions = { ...msg.reactions };
          const userList = updatedReactions?.[emoji] || [];

          if (userList.includes(userId)) {
            updatedReactions[emoji] = userList.filter((u) => u !== userId);
            if (updatedReactions[emoji].length === 0) {
              delete updatedReactions[emoji];
            }
          } else {
            updatedReactions[emoji] = [...userList, userId];
          }

          return { ...msg, reactions: updatedReactions };
        });
      });
    });

    newSocket.on("updateOnlineUsers", (users: userDataToEmit[]) => {
      setOnlineUsers(users);
    });

    return () => {
      console.log("Disconnecting socket...");
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = (message: Message) => {
    socket?.emit("message", message);
  };

  const sendReaction = (payload: {
    messageId: string;
    emoji: string;
    userId: string;
  }) => {
    socket?.emit("message:reaction", payload);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        sendMessage,
        sendReaction,
        messages,
        setMessages,
        onlineUsers,
        setOnlineUsers,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
