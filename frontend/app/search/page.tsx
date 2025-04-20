"use client";

import React, { useEffect, useState } from "react";
import axios from 'axios';
import GroupCard from "@/components/GroupCard";
import { API_URL } from "@/utils/config";

type Chat = {
    _id: string;
    name: string;
    members: string[];
    isGroupChat: boolean;
    groupIcon: string;
    createdAt: Date;
}

type User ={
  _id: string;
  username: string;
  email: string;
  password: string;
  profileIcon: string;
  createdAt: Date;
}

const icons = [
    { id: "icon1", src: "/profile/blue_paw.svg", alt: "Icon 1" },
    { id: "icon2", src: "/profile/green_paw.svg", alt: "Icon 2" },
    { id: "icon3", src: "/profile/purple_paw.svg", alt: "Icon 3" },
    { id: "icon4", src: "/profile/red_paw.svg", alt: "Icon 4" },
    { id: "icon5", src: "/profile/yellow_paw.svg", alt: "Icon 5" },
  ];

const groups = [
  { id: "group1", src: "/groups/blue_group.svg", alt: "GroupImage 1" },
  { id: "group2", src: "/groups/green_group.svg", alt: "GroupImage 2" },
  { id: "group3", src: "/groups/purple_group.svg", alt: "GroupImage 3" },
  { id: "group4", src: "/groups/red_group.svg", alt: "GroupImage 4" },
  { id: "group5", src: "/groups/yellow_group.svg", alt: "GroupImage 5" },
];

export default function SearchPage() {
  const [allGroupChats, setAllGroupChats] = useState<Chat[]>()
  const [searchText,setSearchText] = useState('')
  const [openDialog,setOpenDialog] = useState(false)
  const [selectedIcon,setSelectedIcon] = useState('group1')
  const [groupName,setGroupName] = useState('')
  const [members,setMembers] = useState<string[]>([])
  const [allUsers, setAllUsers] = useState<User[]>([])

  useEffect( ()=>{
    const fetchAllGroupChats = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/chat?group=true${searchText===''?'':`&name=${searchText}` }`);
        console.log(response.data)
        setAllGroupChats(response.data.chats)
      } catch(err: any) {
        console.log("Failed to fetch all group chats:", err.response?.data?.message || err.message);
      }
    }
    
    fetchAllGroupChats()
  },[searchText])

  useEffect(()=>{
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/users`,{
          withCredentials:true
        });
        console.log(response.data.users)
        setAllUsers(response.data.users)
      } catch(err: any) {
        console.log("Failed to fetch all group chats:", err.response?.data?.message || err.message);
      }
    }

    fetchAllUsers()
  },[])

  const createNewGroup = ()=>{
    const createNewGroup2 = async () => {
      try {
        const response = await axios.post(`${API_URL}/api/chat`,{
          name:groupName,
          members,
          isGroupChat:true
        });
        console.log(response.data)
        console.log(response.data.chat)
        alert('create new group successfull!')
        window.location.reload()
      } catch(err: any) {
        console.log("Failed to create new group chats:", err.response?.data?.message || err.message);
      }
    }

    createNewGroup2()
  }

  const toggleMember = (userId: string) => {
    setMembers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

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
        <button className="h-full border text-white text-lg font-semibold px-4 py-2 rounded-lg bg-red-500" onClick={()=>setOpenDialog(true)}>
          Create Group
        </button>
      </div>
      <div className="flex flex-row flex-wrap gap-10">
      {
        allGroupChats?.map((chat: Chat,_) => (
          <GroupCard chat={chat} key={chat._id}/>
        ))
      } 
      </div>
      <dialog className="modal" open={openDialog}>
        <div className="fixed inset-0 flex items-center justify-center bg-black/10">
            <div className="modal-box bg-slate-50 justify-center max-w-1/3 flex flex-col text-black shadow rounded-xl p-10 space-y-5">
              <p className="text-center text-xl">Create new group</p>
              <div className="w-full flex flex-row flex-wrap justify-center text-white gap-4">
                {groups.map((icon) => (
                  <div key={icon.id}
                    className={`w-16 h-16 rounded-full cursor-pointer border-2 flex items-center justify-center border-solid ${
                      selectedIcon === icon.id ? "border-blue-500" : "border-gray-300"
                    }`}
                    onClick={() => setSelectedIcon(icon.id)}
                  >
                    <img src={icon.src} alt={icon.alt} className="w-16 h-16"/>
                  </div>
                ))}
              </div>
              <div className="flex flex-row h-10 justify-center items-center gap-6 w-full">
                <p>group name</p>
                <input
                  className="w-1/2 h-full border rounded-lg px-5 focus:outline-none"
                  placeholder="enter group name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
              <div className="flex flex-row h-fit justify-center items-center space-y-1 w-full flex-wrap">
                <p>members</p>
                <div className="border rounded-lg h-full flex flex-row flex-wrap gap-2 border-gray-100 justify-center">
                  {
                    allUsers?.map((user,index)=>{
                      const isSelected = members.includes(user._id);
                      return (
                        <div className={`flex flex-row border border-gray-300 w-fit items-center gap-2 py-1 px-2 rounded-lg cursor-pointer hover:shadow 
                          ${isSelected ? 'bg-gray-200' : ''}`} key={user._id} onClick={() => toggleMember(user._id)}>
                          <img src={icons.find((icon) => icon.id === user.profileIcon)?.src} alt={user.profileIcon} className="w-8 h-8"/>
                          <p>{user.username}</p>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className="w-full flex flex-row justify-between text-white h-9 gap-4 my-0">
                  <button onClick={() => setOpenDialog(false)} className="w-1/2 border rounded-xl bg-red-500">
                      cancel
                  </button>
                  <button className="w-1/2 border rounded-xl bg-green-500" onClick={createNewGroup}>
                      confirm
                  </button>
              </div>
            </div>
        </div>
    </dialog>
      
    </div>
  );
}