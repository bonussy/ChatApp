"use client";

import ChatSection from "@/components/ChatSection";

export default function GlobalPage() {

return (
    <div className="flex flex-col min-h-screen bg-gray-100 !p-4 gap-4">
      <div className="h-16 w-full bg-white rounded-xl">Navbar</div>
      <div className="flex flex-1 w-full gap-4">
        <div className="w-1/4 bg-white rounded-xl">
          Chat list
        </div>
        <ChatSection />
      </div>
    </div>
  );
}