import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { JwtPayload } from '../types/jwt';
import { verifyToken } from './verifyToken';

// Middleware for checking JWT token
export const authenticate = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
    const token = req.cookies.token; // Assuming you're using cookies to store the token
    if (!token) {
        res.status(401).json({ status: false, message: 'No token provided, authorization denied.' });
        return;
    }

    try{
        const decoded = verifyToken(token);
        if (!decoded) {
            res.status(401).json({ success: false, message: 'Invalid token' });
            return;
        }

        const user = await User.findById(decoded.id).select('-password');
        if(!user) {
            res.status(401).json({  status: false, message: 'User not found' });
            return;
        }
        //console.log('Authenticated user:', user);

        // Cache user in req.user to avoid redundant database queries
        if (!req.user) {
            req.user = await User.findById(decoded.id).select('-password');
        }

        next();
    } catch (error) {
        console.log('Token verification error:', error);
        res.status(400).json({  status: false, message: 'Invalid or expired token.' });
    }
}