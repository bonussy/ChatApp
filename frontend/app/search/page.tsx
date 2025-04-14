"use client";

import React, { useEffect, useState } from "react";
import axios from 'axios';
import GroupCard from "@/components/GroupCard";

type Chat = {
    _id: string;
    name: string;
    members: string[];
    isGroupChat: boolean;
    groupIcon: string;
    createdAt: Date;
}

export default function SearchPage() {
  const [allGroupChats, setAllGroupChats] = useState<Chat[]>()
  const [searchText,setSearchText] = useState('')

  useEffect( ()=>{
    const fetchAllGroupChats = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/chat?group=true${searchText===''?'':`&name=${searchText}` }`);
        console.log(response.data)
        setAllGroupChats(response.data.chats)
      } catch(err: any) {
        console.log("Failed to fetch all group chats:", err.response?.data?.message || err.message);
      }
    }

    fetchAllGroupChats()
  },[searchText])

  return (
    <div className="m-20 space-y-10">
      <div className="flex flex-row items-center gap-10 h-10">
        <h1 className="text-4xl font-bold">Groups</h1>
        <input
          className="w-1/2 h-full border rounded-full px-5 focus:outline-none"
          placeholder="search group by name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
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