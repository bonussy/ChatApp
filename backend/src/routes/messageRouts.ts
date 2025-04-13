import { Router } from 'express';
import { getMessagesByChatId, createMessage, toggleMessageReaction } from '../controllers/messageController';

const router = Router();

router.route('/chatId').post(getMessagesByChatId); // Get messages by chat ID
router.route('/').post(createMessage); // Create a new message
router.route('/toggleReaction').post(toggleMessageReaction); // Toggle reaction on a message

export default router;