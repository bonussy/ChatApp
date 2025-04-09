import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/jwt';

export const sendTokenAsCookie = (
    res: Response,
    userPayload: JwtPayload,
    statusCode: number
): void => {
    const token = jwt.sign(
        userPayload, 
        process.env.JWT_SECRET!, 
        { expiresIn: '1d' }
    );

    res
        .status(statusCode)
        .cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, // 1 วัน
        })
        .json({ sucess: true, token });
};
