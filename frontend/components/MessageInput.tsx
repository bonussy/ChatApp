"use client";

import { useState } from 'react';
// import { useSocket } from '@/context/SocketContext';
import { LuSend } from "react-icons/lu";

type Props = {
  onSend: (text: string ) => void;
};

export default function MessageInput({ onSend }: Props) {
  // const { sendMessage } = useSocket();
  // const [input, setInput] = useState('');
  const [text, setText] = useState<string>('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <div className="p-6">
    <div className="flex justify-between w-full pl-4 pr-3 py-2 border border-gray-200 rounded-xl">
      <input
        // className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
        className="w-full focus:outline-none"
        placeholder="Type here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        // className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
        className="bg-black text-white rounded-xl px-2 py-2"
        onClick={handleSend}
      >
        <LuSend />
      </button>
    </div>
    </div>
  );
}
