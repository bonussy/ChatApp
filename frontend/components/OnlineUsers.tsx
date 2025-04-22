import React from "react";
import AddChat from "@/components/AddChat";

interface userDataToEmit {
  id: string;
  username: string;
  profileIcon: string;
}

interface OnlineUserProp {
  onlineUsers: userDataToEmit[];
  currentUser: userDataToEmit | null;
  setPingUser: Function
}

const icons = [
  { id: "icon1", src: "/profile/blue_paw.svg", alt: "Icon 1" },
  { id: "icon2", src: "/profile/green_paw.svg", alt: "Icon 2" },
  { id: "icon3", src: "/profile/purple_paw.svg", alt: "Icon 3" },
  { id: "icon4", src: "/profile/red_paw.svg", alt: "Icon 4" },
  { id: "icon5", src: "/profile/yellow_paw.svg", alt: "Icon 5" },
];

const OnlineUsers: React.FC<OnlineUserProp> = ({
  onlineUsers,
  currentUser,
  setPingUser,
}) => {
  const seenUsers = new Set();
  console.log("Online Users:", onlineUsers);
  console.log("Current User:", currentUser);
  return (
    <div className="flex flex-col h-full w-full">
      <div className="text-xl font-bold p-4 border-b border-gray-200">
        Online
      </div>
      <div className="flex flex-col h-full overflow-y-auto relative">
        {onlineUsers.map((user) => {
          if (seenUsers.has(user.id)) return null; // Skip duplicate users
          seenUsers.add(user.id); // Add user ID to the Set

          return (
            <div
              key={user.id}
              className="flex items-center justify-between h-10 p-4 border-b border-gray-200 text-xl"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-500">
                  <img
                    src={
                      icons.find((icon) => icon.id === user.profileIcon)?.src
                    }
                    className="w-8 h-8 rounded-full"
                  />
                </div>
                <div className="ml-3">{user.username} {user.id == currentUser?.id ? " (You)" : ""}</div>
              </div>
              {(user.id == currentUser?.id) ? null : (user?.id?.includes(
                  "Guest") || currentUser?.id?.includes("Guest"))?
                  <div className="ml-4 text-gray-500 cursor-pointer" onClick={()=>setPingUser(user)}>+</div> : (
                  <AddChat currentUser={currentUser?.id} parentUser={user.id}/>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OnlineUsers;
