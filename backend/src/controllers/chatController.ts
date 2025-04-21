import { Request, Response } from "express";
import Chat from "../models/chat";
import User from "../models/user";
import mongoose from "mongoose";

export const getChats = async (req: Request, res: Response): Promise<void> => {
  console.log(req.query);

  try {
    let filter: any = {};
    if (req.query.group) filter.isGroupChat = req.query.group;
    if (req.query.name) filter.name = { $regex: req.query.name, $options: "i" };

    console.log(filter);

    const chats = await Chat.find(filter);
    res.status(200).json({ sucess: true, count: chats.length, chats });
  } catch (error) {
    res.status(500).json({ sucess: false, message: "Server error" });
  }
};

export const getChat = async (req: Request, res: Response): Promise<void> => {
  console.log(req.query);

  try {
    const chat = await Chat.findById(req.params.id);
    res.status(200).json({ sucess: true, chat });
  } catch (error) {
    res.status(500).json({ sucess: false, message: "Server error" });
  }
};

export const createChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  let { name, members, isGroupChat, groupIcon } = req.body;
  console.log("Before\t:", name, members, isGroupChat);

  if (members.length <= 2) {
    if (members.length < 2) {
      res.status(400).json({
        success: false,
        message: "Minimum numbers to create new chat is 2",
      });
      return;
    }
    const chat_name = members.sort().join("-");

    const existingChat = await Chat.findOne({
      name: chat_name,
      isGroupChat: false,
    });

    if (existingChat) {
      res.status(400).json({
        success: false,
        message: "Chat with these members already exists",
      });
      return;
    }

    name = chat_name;
    isGroupChat = false;
  } else {
    if (!name) {
      res
        .status(400)
        .json({ success: false, message: "Please insert name for group chat" });
      return;
    }

    if (!groupIcon) {
      const icons = ["group1", "group2", "group3", "group4", "group5"];
      groupIcon = icons[Math.floor(Math.random() * icons.length)];
    }

    isGroupChat = true;
  }

  console.log("After\t:", name, members, isGroupChat);

  const chat = await Chat.create({ name, members, isGroupChat, groupIcon });

  res.status(201).json({
    success: true,
    message: "Create chat successful. Enjoy!",
    chat,
  });
};

export const addMemberToGroupChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  const memberId = req.body.member as string;
  console.log(memberId);

  if (!memberId || !mongoose.Types.ObjectId.isValid(memberId)) {
    res
      .status(400)
      .json({ success: false, message: "Invalid or missing member ID" });
    return;
  }

  const memberObjectId = new mongoose.Types.ObjectId(memberId);

  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      res.status(404).json({ success: false, message: "Chat not found" });
      return;
    }

    const isAlreadyMember = chat.members.some(
      (member: mongoose.Types.ObjectId) => member.equals(memberObjectId)
    );

    if (isAlreadyMember) {
      res
        .status(400)
        .json({ success: false, message: "Member already in chat" });
      return;
    }

    console.log("Requested chat ID:", req.params.id);
    const chat2 = await Chat.findById(req.params.id);
    console.log("Found chat:", chat2);

    chat.members.push(memberObjectId);
    await chat.save();

    res.status(200).json({
      success: true,
      message: "Member added successfully",
      chat,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUserChats = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.params.id;
  console.log("Received userId:", userId); // Log the received userId

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    console.log("Invalid userId:", userId); // Log invalid userId
    res.status(400).json({ success: false, message: "Invalid user ID" });
    return;
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const chats = await Chat.find({ members: { $in: [userId] } })
      .sort({ createdAt: -1 })
      .lean();

    const formattedChats = await Promise.all(
      chats.map(async (chat) => {
        const memberCount = chat.members.length;

        if (!chat.isGroupChat) {
          // Find the other member of the chat
          const otherMemberId = chat.members.find(
            (member) => member.toString() !== userId.toString()
          );
          const otherMember = await User.findById(otherMemberId);

          // Add groupIcon field with the icon of another member and set name to the other member's name
          return {
            ...chat,
            groupIcon: otherMember?.profileIcon,
            name: otherMember?.username,
            memberCount,
          };
        }
        return { ...chat, memberCount };
      })
    );

    res.status(200).json({ success: true, chats: formattedChats });
  } catch (error) {
    console.error("Error fetching chats:", error); // Log error
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const isChatExist = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { members } = req.body;

  if (!members || members.length !== 2) {
    res.status(400).json({ message: "Invalid members field" });
    return;
  }

  const chat_name = members.sort().join("-");
  try {
    const existingChat = await Chat.findOne({
      name: chat_name,
      isGroupChat: false,
    });
    if (existingChat) {
      res.status(200).json({ isExist: true });
      return;
    } else {
      res.status(200).json({ isExist: false });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
