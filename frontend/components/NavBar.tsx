"use client";

import { useState } from "react";
import React from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export interface User {
  _id: string;
  username: string;
  email: string;
  profileIcon: string;
}

interface NavBarProps {
  user: User | null;
}

const icons = [
  { id: "icon1", src: "/profile/blue_paw.svg", alt: "Icon 1" },
  { id: "icon2", src: "/profile/green_paw.svg", alt: "Icon 2" },
  { id: "icon3", src: "/profile/purple_paw.svg", alt: "Icon 3" },
  { id: "icon4", src: "/profile/red_paw.svg", alt: "Icon 4" },
  { id: "icon5", src: "/profile/yellow_paw.svg", alt: "Icon 5" },
];

const NavBar: React.FC<NavBarProps> = (user) => {
  console.log("User in NavBar:", user);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex justify-between items-center p-4 w-full h-full">
      <div className="flex items-center gap-2 h-full">
        <img src="/logo.png" className="h-full"></img>
        <div className="text-2xl font-bold">3-Way Chat</div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex gap-4">
          <Link href="/general">
            <div className="hover:underline">general chat</div>
          </Link>
          <Link href="/global">
            <div className="hover:underline">global chat</div>
          </Link>
          <Link href="/search">
            <div className="hover:underline">search</div>
          </Link>
        </div>
        {user.user ? (
          <div className="relative">
            <img
              src={
                icons.find((icon) => icon.id === user.user?.profileIcon)?.src
              }
              className="w-10 h-10 rounded-full"
              onClick={toggleDropdown}
            />

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-300 rounded-md">
                <Link
                  href="/profile"
                  className="text-center block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <LogoutButton />
              </div>
            )}
          </div>
        ) : (
          <Link href="/login">
            <button className="bg-gray-100 text-black px-4 py-2 rounded-md hover:bg-gray-200">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
