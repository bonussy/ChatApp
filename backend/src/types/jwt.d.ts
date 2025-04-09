import { IUser } from '../models/User'; // Adjust the import path as necessary

export interface JwtPayload {
    id: string;
    username: string;
    email: string;
}

// Extend the Request interface to include the user property
declare global {
    namespace Express {
        interface Request {
            user?: IUser; // The user property will be of type IUser
        }
    }
}