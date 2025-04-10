import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

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

        // Handle "message" event
        socket.on('message', (data) => {
            console.log('Message received:', data);
            io.emit('message', data); // Broadcast message to all connected clients
        });
        
        // Handle disconnection event
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

};

export default initializeSocket;