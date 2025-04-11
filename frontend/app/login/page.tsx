"use client";
import React, {useState} from "react";
import axios from 'axios';
import { useRouter } from "next/navigation"; // Next.js router
import { useSocket } from "@/context/SocketContext";
import { useUser } from "@/hooks/useUser";

export default function LoginPage(){
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const { socket } = useSocket();
  const { user, setUser } = useUser(false); 
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true, // Include credentials in the request
        }
      );

      console.log("Login successful:", response.data);

      // // Fetch user data after login -> work due to do after click login -> have token?
      // const userResponse = await axios.get("http://localhost:3001/api/auth/me", {
      //   withCredentials: true,
      // });
      // setUser(userResponse.data.user); // Update user state

      // // Emit "set-username" event with the username
      // if (userResponse.data.user && socket) {
      //   console.log("Emitting set-username event with username:", userResponse.data.user.username);
      //   socket.emit("set-username", userResponse.data.user.username);
      // }

      router.push("/chat"); // Redirect to chat page
    } catch (err: any) {
      console.error("Login failed:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-[400px] p-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex mb-2.5 gap-2">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            placeholder="your@email.com"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 mt-1"
          />
        </div>
        <div className="flex mb-2.5 gap-2">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 mt-1"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2.5 border-2 rounded-2xl cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
};