"use client";

import React, { useEffect, useState } from "react";
import axios from 'axios';
import GroupCard from "@/components/GroupCard";

type Chat = {
    _id: string;
    name: string;
    members: string[];
    isGroupChat: boolean;
    createdAt: Date;
}

export default function SearchPage() {
  const [allGroupChats, setAllGroupChats] = useState<Chat[]>()

  useEffect( ()=>{
    const fetchAllGroupChats = async () => {
      try {
        const response = await axios.get("http://localhost:3001/chat?group=true");
        console.log(response.data)
        setAllGroupChats(response.data.chats)
      } catch(err: any) {
        console.log("Failed to fetch all group chats:", err.response?.data?.message || err.message);
      }
    }

    fetchAllGroupChats()
  },[])

  return (
    <div className="m-20 space-y-10">
      <h1 className="text-4xl font-bold">Groups</h1>
      <div className="flex flex-row flex-wrap gap-10">
      {
        allGroupChats?.map((chat: Chat,_) => (
          <GroupCard chat={chat} key={chat._id}/>
        ))
      } 
      </div>
      
    </div>
  );
}