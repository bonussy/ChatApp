import { Request, Response } from 'express';
import Chat from '../models/chat';

export const getChats = async (req: Request, res: Response): Promise<void> => {
    console.log(req.query)
    
    try {
        let filter:any = {}
        if(req.query.group) filter.isGroupChat = req.query.group
        if(req.query.name) filter.name = { $regex: req.query.name, $options: 'i' }

        console.log(filter)

        const chats = await Chat.find(filter)
        res.status(200).json({sucess: true, count: chats.length, chats});
    } catch (error) {
        res.status(500).json({ sucess: false, message: 'Server error' });
    }
}

export const createChat = async (req: Request, res: Response): Promise<void> => {
    let { name, members, isGroupChat, groupIcon } = req.body;
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

        if(!groupIcon) {
            const icons = ['group1', 'group2', 'group3','group4','group5'];
            groupIcon = icons[Math.floor(Math.random() * icons.length)];
        }

        isGroupChat = true;
    }

    console.log('After\t:',name,members,isGroupChat)
    
    const chat = await Chat.create({ name, members, isGroupChat, groupIcon });

    res.status(201).json({ 
        success: true,
        message: 'Create chat successful. Enjoy!',
        chat
    });
};