import { Request, Response } from 'express';
import Message from '../models/messages';

// export const getMessagesByChatId = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { chatId } = req.body;
//         const messages = await Message.find({ chat: chatId });
//         res.status(200).json({sucess: true, messages});
//     } catch (error) {
//         res.status(500).json({ sucess: false, message: 'Server error' });
//     }
// }

export const getMessagesByChatId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { chatId } = req.body;
  
      const messages = await Message.find({ chat: chatId })
        .populate({
          path: 'sender',
          select: 'username profileIcon', // Include only necessary fields
        });
  
      res.status(200).json({ success: true, messages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const createMessage = async (req: Request, res: Response): Promise<void> => {
    const { senderId, chatId, text } = req.body;
    console.log("Creating message with \n\tSender ID:", senderId, "\n\tChat ID:", chatId, "\n\tText:", text); // Debugging line
    await Message.create({ sender: senderId, chat: chatId, text });

    res.status(201).json({ success: true, message: 'Create message successful. Enjoy!' });
};

export const toggleMessageReaction = async (req: Request, res: Response): Promise<void> => {
    try {
      const { messageId, emoji, userId } = req.body;
  
      const message = await Message.findById(messageId);
      if (!message) {
        res.status(404).json({ success: false, message: 'Message not found' });
        return;
      }
  
      const currentReactions = message.reactions.get(emoji) || [];
      const userIndex = currentReactions.findIndex(id => id.toString() === userId);
  
      if (userIndex === -1) {
        // Add user reaction
        currentReactions.push(userId);
      } else {
        // Remove user reaction (toggle off)
        currentReactions.splice(userIndex, 1);
      }
  
      message.reactions.set(emoji, currentReactions);
      await message.save();
  
      res.status(200).json({ success: true, message: 'Reaction updated', reactions: message.reactions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
};
  