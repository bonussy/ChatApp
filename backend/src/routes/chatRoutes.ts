import { Router } from "express";
import {
  addMemberToGroupChat,
  createChat,
  getChat,
  getChats,
  getUserChats,
  isChatExist,
} from "../controllers/chatController";

const router = Router();

router.route("/").post(createChat).get(getChats);
router.route("/:id").get(getChat).put(addMemberToGroupChat);
router.route("/user/:id").get(getUserChats);
router.route("/isChatExist").post(isChatExist);

export default router;
