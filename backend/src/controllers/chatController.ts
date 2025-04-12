import { Request, Response } from 'express';
import Chat from '../models/chat';

export const getChats = async (req: Request, res: Response): Promise<void> => {
    try {
        const chats = await Chat.find();
        res.status(200).json({sucess: true,count:chats.length, chats});
    } catch (error) {
        res.status(500).json({ sucess: false, message: 'Server error' });
    }
}

export const createChat = async (req: Request, res: Response): Promise<void> => {
    const { name, members } = req.body;

    await Chat.create({ name, members });

    res.status(201).json({ success: true, message: 'Create chat successful. Enjoy!' });
};