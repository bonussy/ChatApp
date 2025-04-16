"use client";

import { useState } from "react";
import React from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { useUser } from "@/hooks/useUser";
import React from "react";

const NavBar: React.FC = () => {
  const { user, loading, setUser } = useUser(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex justify-between items-center p-4 w-full h-full">
      <div className="text-2xl font-bold">3-Way Chat</div>
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
        {user ? (
          <div className="relative">
            <div
              className="w-10 h-10 rounded-full bg-gray-500"
              onClick={toggleDropdown}
            >
              <img src={user.profileIcon} />
            </div>

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
