// 'use client';

// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { connectSocket, sendMessage as sendMessageToSocket, listenForMessages } from '../services/socketService';

// interface SocketContextType {
//   socket: any;
//   messages: string[];
//   sendMessage: (message: string) => void;
// }  

// const SocketContext = createContext<SocketContextType | undefined>(undefined);

// export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
//   const [socket, setSocket] = useState<any>(null);
//   const [messages, setMessages] = useState<string[]>([]);

//   useEffect(() => {
//     const socketConnection = connectSocket();
//     setSocket(socketConnection);

//     listenForMessages((message: string) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       socketConnection.disconnect();
//     };
//   }, []);

//   const sendMessage = (message: string) => {
//     if (socket) {
//       sendMessageToSocket(message);
//     }
//   };

//   return (
//     <SocketContext.Provider value={{ socket, messages, sendMessage }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export const useSocket = () => {
//   const context = useContext(SocketContext);
//   if (!context) {
//     throw new Error('useSocket must be used within a SocketProvider');
//   }
//   return context;
// };

'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

type SocketContextType = {
  socket: Socket | null;
  sendMessage: (message: string) => void;
  messages: string[];
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  sendMessage: () => {},
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
