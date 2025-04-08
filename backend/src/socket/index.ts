import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';

const app = express();
const server = createServer(app);

//Create Socket.io server instance
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

//Handle socket connection event
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // You can listen for events like "message" to handle chat messages
    socket.on('message', (data) => {
        console.log('Message received:', data);
        io.emit('message', data); // Broadcast message to all connected clients
    });

    // Handle disconnection event
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

export default server;