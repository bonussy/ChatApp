import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { verifyToken } from '../utils/verifyToken';

const initializeSocket = (server: HttpServer): void => {
    //Create Socket.io server instance
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    //Handle socket connection event
    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        let username: string | null = null; // Default username

        // Handle "set-username" event to update the username dynamically
        socket.on('set-username', (usernameFromClient: string) => {
            console.log('set-username event received with token:', usernameFromClient);
            username = usernameFromClient;
            console.log(`Username updated for socket ${socket.id}:`, username);
        });

        // Handle "message" event
        socket.on('message', (data) => {
            const sender = username ?? `Guest`;
            const messagePayload = {
                user: sender, // Use the updated username
                text: data.text,
            };
            console.log('Message received:', messagePayload);
            io.emit('message', messagePayload); // Broadcast message to all connected clients
        });

        // Handle disconnection event
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

};

export default initializeSocket;