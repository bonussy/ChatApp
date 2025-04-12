import { Router } from 'express';
import { createChat, getChats } from '../controllers/chatController';

const router = Router();

router.route('/').post(createChat).get(getChats)

export default router;