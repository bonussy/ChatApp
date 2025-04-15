import { Request, Response } from 'express';
import Chat from '../models/chat';
import mongoose from 'mongoose';

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

export const getChat = async (req: Request, res: Response): Promise<void> => {
    console.log(req.query)
    
    try {
        const chat = await Chat.findById(req.params.id)
        res.status(200).json({sucess: true, chat});
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

export const addMemberToGroupChat = async (req: Request, res: Response): Promise<void> => {
    const memberId = req.body.member as string;
    console.log(memberId)

    if (!memberId || !mongoose.Types.ObjectId.isValid(memberId)) {
        res.status(400).json({ success: false, message: 'Invalid or missing member ID' });
        return;
    }

    const memberObjectId = new mongoose.Types.ObjectId(memberId);

    try {
        const chat = await Chat.findById(req.params.id);

        if (!chat) {
            res.status(404).json({ success: false, message: 'Chat not found' });
            return;
        }

        const isAlreadyMember = chat.members.some((member: mongoose.Types.ObjectId) =>
            member.equals(memberObjectId)
        );

        if (isAlreadyMember) {
            res.status(400).json({ success: false, message: 'Member already in chat' });
            return;
        }

        console.log("Requested chat ID:", req.params.id);
        const chat2 = await Chat.findById(req.params.id);
        console.log("Found chat:", chat2);

        chat.members.push(memberObjectId);
        await chat.save();

        res.status(200).json({
            success: true,
            message: 'Member added successfully',
            chat
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
