import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  profileIcon: string;
  isLoggedIn: boolean;
}

const OnlineUsers: React.FC = () => {
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        //const response = await axios.get("/api/online-users"); // Replace with your backend endpoint
        const response = {
          data: [
            {
              id: "1",
              name: "John Doe",
              profileIcon: "/profile/blue_paw.svg",
              isLoggedIn: true,
            },
            {
              id: "2",
              name: "Krit H",
              profileIcon: "/profile/red_paw.svg",
              isLoggedIn: false,
            },
            {
              id: "3",
              name: "John Doe",
              profileIcon: "/profile/blue_paw.svg",
              isLoggedIn: true,
            },
            {
              id: "4",
              name: "Krit H",
              profileIcon: "/profile/red_paw.svg",
              isLoggedIn: false,
            },
            {
              id: "5",
              name: "John Doe",
              profileIcon: "/profile/blue_paw.svg",
              isLoggedIn: true,
            },
            {
              id: "6",
              name: "Krit H",
              profileIcon: "/profile/red_paw.svg",
              isLoggedIn: false,
            },
            {
              id: "7",
              name: "John Doe",
              profileIcon: "/profile/blue_paw.svg",
              isLoggedIn: true,
            },
            {
              id: "8",
              name: "Krit H",
              profileIcon: "/profile/red_paw.svg",
              isLoggedIn: false,
            },
            {
              id: "9",
              name: "John Doe",
              profileIcon: "/profile/blue_paw.svg",
              isLoggedIn: true,
            },
            {
              id: "10",
              name: "Krit H",
              profileIcon: "/profile/red_paw.svg",
              isLoggedIn: false,
            },
            {
              id: "11",
              name: "John Doe",
              profileIcon: "/profile/blue_paw.svg",
              isLoggedIn: true,
            },
            {
              id: "12",
              name: "Krit H",
              profileIcon: "/profile/red_paw.svg",
              isLoggedIn: false,
            },
          ],
        }; // Mock response for testing
        setOnlineUsers(response.data); // Assuming the response is an array of users
      } catch (err) {
        setError("Failed to fetch online users");
      } finally {
        setLoading(false);
      }
    };

    fetchOnlineUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="text-2xl font-bold p-4 border-b border-gray-200">
        Online
      </div>
      <div className="flex flex-col h-full overflow-y-auto relative">
        {onlineUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between h-10 p-4 border-b border-gray-200 text-xl"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-500">
                <img src={user.profileIcon} />
              </div>
              <div className="ml-3">{user.name}</div>
            </div>
            <div className="ml-4 text-gray-500">
              {user.isLoggedIn ? "+" : ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineUsers;
