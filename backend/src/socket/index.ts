import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { verifyToken } from "../utils/verifyToken";
import { time } from "console";
import { v4 as uuidv4 } from "uuid";
import Message from "../models/messages";

const initializeSocket = (
  server: HttpServer,
  onlineUsers: { [key: string]: string }
): void => {
  // Create Socket.io server instance
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Handle socket connection event
  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    let username: string | null = null; // Default username

    // Handle "set-username" event to update the username dynamically
    socket.on("set-username", (usernameFromClient: string) => {
      console.log(
        "set-username event received with token:",
        usernameFromClient
      );
      username = usernameFromClient;
      onlineUsers[socket.id] = username;
      console.log(`Username updated for socket ${socket.id}:`, username);
      io.emit("updateOnlineUsers", Object.values(onlineUsers));
    });

    // Handle "message" event
    socket.on("message", (data) => {
      const sender = username ?? `Guest`;
      const messagePayload = data;
      console.log("Message received:", messagePayload);
      io.emit("message", messagePayload); // Broadcast message to all connected clients
    });

    // Handle "reaction" event
    socket.on("message:reaction", ({ messageId, emoji, userId }) => {
      console.log("Reaction received:", { messageId, emoji, userId });
      io.emit("message:reaction", { messageId, emoji, userId }); // Broadcast reaction to all connected clients
    });

    // Handle disconnection event
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      delete onlineUsers[socket.id];
      io.emit("updateOnlineUsers", Object.values(onlineUsers));
    });
  });
};

export default initializeSocket;
