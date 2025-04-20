"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Chat {
  _id: string;
  name: string;
  isGroupChat: boolean;
  groupIcon: string;
  memberCount: number;
}

interface ChatListProps {
  updateChatDetails: (chat: Chat) => void;
  chatList: Chat[];
}

const icons = [
  { id: "icon1", src: "/profile/blue_paw.svg", alt: "Icon 1" },
  { id: "icon2", src: "/profile/green_paw.svg", alt: "Icon 2" },
  { id: "icon3", src: "/profile/purple_paw.svg", alt: "Icon 3" },
  { id: "icon4", src: "/profile/red_paw.svg", alt: "Icon 4" },
  { id: "icon5", src: "/profile/yellow_paw.svg", alt: "Icon 5" },
  { id: "group1", src: "/groups/blue_group.svg", alt: "Group Icon 1" },
  { id: "group2", src: "/groups/green_group.svg", alt: "Group Icon 2" },
  { id: "group3", src: "/groups/purple_group.svg", alt: "Group Icon 3" },
  { id: "group4", src: "/groups/red_group.svg", alt: "Group Icon 4" },
  { id: "group5", src: "/groups/yellow_group.svg", alt: "Group Icon 5" },
];

const ChatList: React.FC<ChatListProps> = ({ updateChatDetails, chatList }) => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="text-xl font-bold p-4 border-b border-gray-200">
        Chats
      </div>
      <div className="flex flex-col h-full overflow-y-auto relative">
        {chatList.map((chat) => (
          <div
            key={chat._id}
            className="flex items-center justify-between h-10 p-4 border-b border-gray-200 text-xl"
            onClick={() => updateChatDetails(chat)}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-500">
                <img
                  src={icons.find((icon) => icon.id === chat.groupIcon)?.src}
                  className="w-8 h-8 rounded-full"
                />
              </div>
              <div className="ml-3">{chat.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
