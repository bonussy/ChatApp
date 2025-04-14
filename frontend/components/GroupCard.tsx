import axios from 'axios';
import { useEffect, useState } from 'react';

type Chat = {
    _id: string;
    name: string;
    members: string[];
    isGroupChat: boolean;
    groupIcon: string;
    createdAt: Date;
}

const groups = [
    { id: "group1", src: "/groups/blue_group.svg", alt: "GroupImage 1" },
    { id: "group2", src: "/groups/green_group.svg", alt: "GroupImage 2" },
    { id: "group3", src: "/groups/purple_group.svg", alt: "GroupImage 3" },
    { id: "group4", src: "/groups/red_group.svg", alt: "GroupImage 4" },
    { id: "group5", src: "/groups/yellow_group.svg", alt: "GroupImage 5" },
];

export default function GroupCard({ chat }: { chat: Chat }) {
    const [members,setMembers] = useState<Map<string,string>>(new Map())

    useEffect(() => {
        const fetchMemberUsername = async () => {
            const map = new Map<string,string>()

            await Promise.all(
                chat.members.map(async (id: string) => {
                    try {
                        const response = await axios.get(`http://localhost:3001/api/user/${id}`);
                        map.set(id, response.data.user.username);
                    } catch (err: any) {
                        console.log("Failed to fetch user", err.response?.data?.message || err.message);
                    }
                })
            );

            setMembers(map)
        }

        fetchMemberUsername()

    })

    return (
        <div className="border rounded-lg p-6 space-y-4 justify-items-center min-w-40">
            <img
                src={groups.find((icon) => icon.id === chat.groupIcon)?.src}
                alt={groups.find((icon) => icon.id === chat.groupIcon)?.alt}
                className="w-20 h-20 rounded-full"
            />
            <p className="font-semibold text-2xl">{chat.name}</p>
            <div>
                {
                    chat.members.map((member, index) => (
                        <p key={member}>{members.get(member)}</p>
                    ))
                }
            </div>

        </div>
    )
}