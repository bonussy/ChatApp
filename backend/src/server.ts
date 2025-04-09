import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import server from './socket/index';

// Load environment variables
dotenv.config();

//Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();
app.use(express.json());

app.use(cors());

app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);


// Start the server and Socket.io
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});