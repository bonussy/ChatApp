// app/chat/page.tsx
'use client';

import ChatBox from '@/components/ChatBox';
import MessageInput from '@/components/MessageInput';
import { useSocket } from '@/context/SocketContext';

export default function ChatPage() {
  const { messages } = useSocket();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md h-[600px] bg-white shadow-lg rounded-lg flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4">
          <ChatBox messages={messages} />
        </div>
        <div className="border-t p-4">
          <MessageInput />
        </div>
      </div>
    </div>
  );
}
