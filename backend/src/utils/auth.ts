import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { JwtPayload } from '../types/jwt';

// Middleware for checking JWT token
export const authenticate = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
    const token = req.cookies.token; // Assuming you're using cookies to store the token
    if (!token) {
        res.status(401).json({ status: false, message: 'No token provided, authorization denied.' });
        return;
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload; 
        const user = await User.findById(decoded.id).select('-password');
        if(!user) {
            res.status(401).json({  status: false, message: 'User not found' });
            return;
        }
        console.log('Authenticated user:', user);
        req.user = user; // Attach the user to the request object
        next();
    } catch (error) {
        console.log('Token verification error:', error);
        res.status(400).json({  status: false, message: 'Invalid or expired token.' });
    }
}