import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { JwtPayload } from '../types/่jwt';
import { sendTokenAsCookie } from '../utils/sendToken';

const createToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1d' });
};

//Register
export const register = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ message: 'Please fill in all fields.' });
        return;
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        res.status(400).json({ message: 'Email already exists.' });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    const payload = {
        id: user._id.toString(),
        username: user.username,
        email: user.email
    };

    sendTokenAsCookie(res, payload, 201, 'User registered successfully.');
}

//Login
export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401).json({ message: 'Invalid credentials.' });
        return;
    }

    const payload = {
        id: user._id.toString(),
        username: user.username,
        email: user.email
    };

    sendTokenAsCookie(res, payload, 200, 'User logged in successfully.');
};

//Logout
export const logout = async (req: Request, res: Response): Promise<void> => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        sameSite: 'strict', // Adjust as necessary
    });
    res.status(200).json({ message: 'Logged out successfully.' });
};

//GET all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find().select('-password'); // Exclude password field
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

//GET me
export const getMe = async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies.token;

    console.log('Token from cookies:', token); // Debugging line
    
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        console.log('Decoded token:', decoded); // Debugging line
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
