"use client";

import React, { useEffect, useState } from "react";

interface Chat {
  id: string;
  name: string;
  isGroupChat: boolean;
  groupIcon: string;
  memberCount: number;
}

interface ChatListProps {
  updateChatDetails: (chat: Chat) => void;
}

const ChatList: React.FC<ChatListProps> = ({ updateChatDetails }) => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        //const response = await axios.get("/api/chat-list"); // Replace with your actual API endpoint
        const response = {
          data: [
            {
              id: "1",
              name: "kkkk",
              isGroupChat: true,
              groupIcon: "/profile/blue_paw.svg",
              memberCount: 3,
            },
            {
              id: "2",
              name: "aaaa",
              isGroupChat: true,
              groupIcon: "/profile/blue_paw.svg",
              memberCount: 5,
            },
          ],
        };
        setChatList(response.data);
      } catch (error) {
        console.error("Error fetching chat list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatList();
    console.log("Chat list fetched successfully");
    console.log(chatList);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="text-xl font-bold p-4 border-b border-gray-200">
        Chats
      </div>
      <div className="flex flex-col h-full overflow-y-auto relative">
        {chatList.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center justify-between h-10 p-4 border-b border-gray-200 text-xl"
            onClick={() => updateChatDetails(chat)}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-500">
                <img src={chat.groupIcon} />
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
