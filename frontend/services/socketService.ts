// services/socketService.ts
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;  // ชนิดข้อมูลเป็น null หรือ Socket

// ฟังก์ชันเชื่อมต่อ
const connectSocket = (): Socket => {
  if (!socket) {
    socket = io('http://localhost:3001', {
      withCredentials: true,  // ใช้คุกกี้
    });

    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });
  }
  return socket;  // คืนค่า socket
};

// ฟังก์ชันส่งข้อความ
const sendMessage = (message: string) => {
  if (socket) {
    socket.emit('message', message);  // ส่งข้อความไปยัง server
  }
};

// ฟังก์ชันรับข้อความ
const listenForMessages = (callback: (message: string) => void) => {
  if (socket) {
    socket.on('message', callback);  // รับข้อความจาก server
  }
};

export { connectSocket, sendMessage, listenForMessages };
