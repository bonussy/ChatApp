import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import cookieParser from 'cookie-parser';

//Connect to MongoDB
connectDB();

const app = express();

app.use(express.json());

app.use(cors());

app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: '*',
    }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});