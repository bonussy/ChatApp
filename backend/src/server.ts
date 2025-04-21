import express from "express";
import http from "http";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import initializeSocket from "./socket";
import userRoutes from "./routes/userRoutes";
import messageRoutes from "./routes/messageRouts";
import chatRoutes from "./routes/chatRoutes";

import { Request, Response } from 'express';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
  })
);
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/chat", chatRoutes);

// Create HTTP server
const server = http.createServer(app);

// Track online users globally
let onlineUsers: { [key: string]: string } = {};

// Initialize Socket.IO
initializeSocket(server, onlineUsers);

// Endpoint to get online users
app.get("/api/online-users", (req: Request, res: Response) => {
  res.json({ onlineUsers: Object.values(onlineUsers) });
});

// Start the server and Socket.io
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
