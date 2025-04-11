"use client";

import { useState } from 'react';
import { useSocket } from '@/context/SocketContext';

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
    <div className="flex gap-2 p-4 border-t bg-white">
      <input
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}
