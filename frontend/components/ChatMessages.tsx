"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";

type Message = {
  _id: string;
  sender: {
    _id: string;
    username: string;
    profileIcon: string;
  }
  chat: string; // chatId
  text: string;
  timestamp: Date;
  reactions?: {
    [emoji: string]: string[]; // emoji: array of userIds who reacted
  };
};

type Props = {
  userId: string;
  chatId: string;
  messages: Message[];
  globalUserData?: any;
  sendReaction: (payload: {
    messageId: string;
    emoji: string;
    userId: string;
  }) => void; // new prop
};

const formatDate = (timestamp: Date): string => {
  return new Intl.DateTimeFormat("en-GB", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
    .format(new Date(timestamp))
    .toUpperCase();
};

const icons = [
  { id: "icon1", src: "/profile/blue_paw.svg", alt: "Icon 1" },
  { id: "icon2", src: "/profile/green_paw.svg", alt: "Icon 2" },
  { id: "icon3", src: "/profile/purple_paw.svg", alt: "Icon 3" },
  { id: "icon4", src: "/profile/red_paw.svg", alt: "Icon 4" },
  { id: "icon5", src: "/profile/yellow_paw.svg", alt: "Icon 5" },
];

export default function ChatMessages({ userId, chatId, messages, globalUserData, sendReaction }: Props) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [targetMessageIdx, setTargetMessageIdx] = useState<string | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    import("emoji-picker-element");
  }, []);

  // click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target as Node)
      ) {
        setShowEmojiPicker(false);
        setTargetMessageIdx(null);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  // emoji select handler
  useEffect(() => {
    const handleEmojiClick = async (e: any) => {
      const emoji = e.detail.unicode;
      if (targetMessageIdx !== null) {
        sendReaction({
          messageId: targetMessageIdx,
          emoji,
          userId
        });
      }

      if (!globalUserData) {
        try {
          const response = await axios.post("http://localhost:3001/api/messages/toggleReaction", {
            messageId: targetMessageIdx,
            emoji,
            userId,
          }, {
            withCredentials: true,
          });
          console.log("Reaction sent successfully:", response.data.message);
        } catch (err: any) {
          console.log("Failed to send reaction:", err.response?.data?.message || err.message);
        }
      }

      setShowEmojiPicker(false);
      setTargetMessageIdx(null);
    };

    const picker = document.querySelector("emoji-picker");
    picker?.addEventListener("emoji-click", handleEmojiClick);
    return () => {
      picker?.removeEventListener("emoji-click", handleEmojiClick);
    };
  }, [targetMessageIdx, sendReaction]);

  return (
    <div className="flex flex-col h-full gap-4 px-6 pt-4 overflow-y-auto flex-1 rounded-xl relative">
      {/* {messages.map((msg, idx) => { */}
      {messages.filter(msg => msg.chat === chatId).map((msg, idx) => {
        const isUser = msg.sender._id === userId;

        return (
          <div
            key={idx}
            className={`flex gap-2 w-fit max-w-[75%] ${
              isUser ? "self-end flex-row-reverse items-end" : "self-start items-start"
            }`}
          >

            {!isUser && (
              <img
                src={icons.find((icon) => icon.id === msg.sender.profileIcon)?.src}  
                alt={`${msg.sender.username} icon`}
                className="w-8 h-8 rounded-full"
              />
            )}

            <div className="flex flex-col">
              <div className="flex justify-between w-full text-gray-500 gap-2">
                <span className="font-bold text-gray-600">
                  {isUser ? "You" : msg.sender.username}
                </span>
                <span>{formatDate(msg.timestamp)}</span>
              </div>
              <div
                className={`py-2 px-4 rounded-xl ${
                  isUser
                    ? "bg-[#e1f1f8] rounded-tr-none"
                    : "bg-gray-200 rounded-tl-none"
                } text-black`}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setShowEmojiPicker(true);
                  setTargetMessageIdx(msg._id);
                }}
              >
                {msg.text}
                {msg.reactions && (
                  <div className="flex gap-2 text-sm">
                    {Object.entries(msg.reactions)
                      .filter(([_, users]) => users.length > 0)
                      .map(([emoji, users]) => (
                        <span
                          key={emoji}
                          className="px-2 py-1 mt-2 bg-white rounded-full border text-black"
                        >
                          {emoji} {users.length}
                        </span>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <div ref={messagesEndRef} />

      {showEmojiPicker && (
        <div className="fixed inset-0 z-50 bg-gray-700/75 transition-opacity flex items-center justify-center">
          <div ref={emojiPickerRef} className="bg-white rounded-xl p-4">
            <emoji-picker></emoji-picker>
          </div>
        </div>
      )}
    </div>
  );
}
