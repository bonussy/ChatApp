"use client";

type Message = {
  user: string;
  text: string;
}; 

type Props = {
    messages: Message[];
  };
  
  export default function ChatBox({ messages }: Props) {
    return (
      <div className="flex flex-col gap-2 p-4 overflow-y-auto flex-1">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className="bg-blue-500 text-white p-3 rounded-xl max-w-[75%] self-end shadow"
          >
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
    );
  }
  
  