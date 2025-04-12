"use client";

type Message = {
  user: string;
  text: string;
}; 

type Props = {
    messages: Message[];
  };
  
  export default function ChatMessages({ messages }: Props) {
    return (
        <div className="h-16 w-full bg-red-500">
        {/* <div className="flex flex-col gap-2 p-4 overflow-y-auto flex-1 bg-red-500">
            {messages.map((msg, idx) => (
            <div
                key={idx}
                className="bg-defaultBlue text-white p-3 rounded-xl max-w-[75%] self-end shadow"
            >
                <strong>{msg.user}:</strong> {msg.text}
            </div>
            ))}
        </div> */}
        </div>
    );
  }
  
  