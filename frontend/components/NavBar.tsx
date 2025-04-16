"use client";

import { useState } from "react";
import React from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const NavBar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex justify-between items-center p-4 w-full h-full">
      <div className="text-2xl font-bold">3-Way Chat</div>
      <div className="flex gap-8 items-center">
        <div className="flex gap-4">
          <Link href="/general">
            <div className="hover:text-blue-500 hover:underline">
              general chat
            </div>
          </Link>
          <Link href="/global">
            <div className="hover:text-blue-500 hover:underline">
              global chat
            </div>
          </Link>
          <Link href="/search">
            <div className="hover:text-blue-500 hover:underline">search</div>
          </Link>
        </div>
        <div className="relative">
          <div
            className="w-10 h-10 rounded-full bg-gray-500"
            onClick={toggleDropdown}
          ></div>

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
      </div>
    </div>
  );
};

export default NavBar;
