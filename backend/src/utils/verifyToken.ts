import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/jwt";

export const verifyToken = (token: string): JwtPayload | null => {
    try{
        return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    } catch (error: any) {
        console.error('Token verification failed:', error.message);
        return null;
    }
};