'ีuse client';

import { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

type SocketContextType = {
  socket: Socket | null; 
  sendMessage: (message: string) => void;
  messages: string[]; //collect chat message
};

const SocketContext = createContext<SocketContextType>({
  socket: null, // no connection at beginning
  sendMessage: () => {}, // update later
  messages: [],
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const newSocket = io('http://localhost:3001'); // เปลี่ยนตาม backend ของคุณ
    setSocket(newSocket);

    newSocket.on('message', (message: string) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = (message: string) => {
    if (socket) {
      socket.emit('message', message);
    //   setMessages((prev) => [...prev, message]); // <-- เพิ่มตรงนี้ให้แสดงข้อความที่เราส่ง
    }
  };

  return (
    <SocketContext.Provider value={{ socket, sendMessage, messages }}>
      {children}
    </SocketContext.Provider>
  );
};
