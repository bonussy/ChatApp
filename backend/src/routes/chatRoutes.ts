import { Router } from 'express';
import { addMemberToGroupChat, createChat, getChat, getChats } from '../controllers/chatController';

const router = Router();

router.route('/').post(createChat).get(getChats)
router.route('/:id').get(getChat).put(addMemberToGroupChat)

export default router;