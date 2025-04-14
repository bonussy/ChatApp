import { Request, Response } from 'express';
import Chat from '../models/chat';

export const getChats = async (req: Request, res: Response): Promise<void> => {
    // console.log(req.query.group)
    try {
        let filter = {}
        if(req.query.group) filter = { isGroupChat: req.query.group }

        const chats = await Chat.find(filter)
        res.status(200).json({sucess: true, count: chats.length, chats});
    } catch (error) {
        res.status(500).json({ sucess: false, message: 'Server error' });
    }
}

export const createChat = async (req: Request, res: Response): Promise<void> => {
    let { name, members, isGroupChat } = req.body;
    console.log('Before\t:',name,members,isGroupChat)
    
    if(!isGroupChat) {
        const chat_name = members.sort().join('-');
        name = chat_name
        isGroupChat = false;
    }
    else {
        if(!name) {
            res.status(400).json({success:false, message: 'Please insert name for group chat'});
            return;
        }

        isGroupChat = true;
    }

    console.log('After\t:',name,members,isGroupChat)
    
    const chat = await Chat.create({ name, members, isGroupChat });

    res.status(201).json({ 
        success: true,
        message: 'Create chat successful. Enjoy!',
        chat
    });
};