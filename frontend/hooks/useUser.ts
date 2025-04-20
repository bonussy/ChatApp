import { useEffect, useState } from "react";
import axios from 'axios';
import { API_URL } from "@/utils/config";

export interface User {
    _id: string;
    username: string;
    email:string;
    profileIcon: string;
}

export const useUser = ( autoFetch = true) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const fetchUser = async () => {
        try{
            const response = await axios.get(`${API_URL}/api/auth/me`, {
                withCredentials: true // Include cookies in the request
            });
            setUser(response.data.user);
            setError("")
            console.log("User fetched successfully:", response.data.user);
        } catch (err: any) {
            // Handle cases where the user is not logged in
            if (err.response?.status === 401) {
                console.log("User not logged in yet.");
                setUser(null); // Ensure user state is null
            } else {
                console.error("Failed to fetch user:", err.response?.data?.message || err.message);
                setError(err.response?.data?.message || "Failed to fetch user");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(autoFetch){
            fetchUser();
        } else {
            setLoading(false);
        }
    },[autoFetch]);

    const logout = async () => {
        try {
            await axios.get(`${API_URL}/api/auth/logout`, {
                withCredentials: true,
            });
            setUser(null); // Clear user state
        } catch (err: any) {
            console.error("Logout failed:", err.response?.data?.message || err.message);
        }
    };

    return { user, loading, error, setUser, logout};
}