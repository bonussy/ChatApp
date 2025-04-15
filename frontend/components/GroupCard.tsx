import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Chat = {
  _id: string;
  name: string;
  members: string[];
  isGroupChat: boolean;
  groupIcon: string;
  createdAt: Date;
};

const groups = [
  { id: "group1", src: "/groups/blue_group.svg", alt: "GroupImage 1" },
  { id: "group2", src: "/groups/green_group.svg", alt: "GroupImage 2" },
  { id: "group3", src: "/groups/purple_group.svg", alt: "GroupImage 3" },
  { id: "group4", src: "/groups/red_group.svg", alt: "GroupImage 4" },
  { id: "group5", src: "/groups/yellow_group.svg", alt: "GroupImage 5" },
];

export default function GroupCard({ chat }: { chat: Chat}) {
    const [members,setMembers] = useState<string[]>(chat.members);
    const [membersUsername, setMembersUsername] = useState<Map<string, string>>(new Map());
    const [openDialog, setOpenDialog] = useState(false);

    const addMember = () => {
        const fetchUserAndUpdateMember = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/auth/me", {
                    withCredentials: true,
                });

                const userId = response.data.user._id;
                console.log("User fetched successfully:", response.data.user);
                console.log(chat._id)
                const response2 = await axios.put(`http://localhost:3001/api/chat/${chat._id}`, {
                    member:userId
                });
                console.log("update member successfully:", response2.data);
                console.log(response2.data.chat.members)
                setMembers(response2.data.chat.members)
                alert('joined successfull!')
                window.location.reload();

            } catch (err: any) {
                console.log("server error:", err.response?.data?.message || err.message);
            }
        };

        fetchUserAndUpdateMember()
        setOpenDialog(false)
    }

    useEffect(() => {
        const fetchMemberUsername = async () => {
            const map = new Map<string, string>();

            await Promise.all(chat.members.map(async (id: string) => {
                try {
                    const response = await axios.get(`http://localhost:3001/api/user/${id}`);
                    map.set(id, response.data.user.username);
                } catch (err: any) {
                    console.log("Failed to fetch user",err.response?.data?.message || err.message);
                }
                })
            );

            setMembersUsername(map);
        };

        fetchMemberUsername();
    },[]);

    return (
        <>
        <div className="border rounded-lg p-6 space-y-4 justify-items-center min-w-40 hover:shadow-lg" 
        onClick={() => setOpenDialog(true)}>
            <img
                src={groups.find((icon) => icon.id === chat.groupIcon)?.src}
                alt={groups.find((icon) => icon.id === chat.groupIcon)?.alt}
                className="w-20 h-20 rounded-full"
            />
            <p className="font-semibold text-2xl">{chat.name}</p>
            <div>
                {members.map((member, index) => (
                    <p key={member}>{membersUsername.get(member)}</p>
                ))}
            </div>
        </div>
        <dialog className="modal" open={openDialog}>
            <div className="fixed inset-0 flex items-center justify-center bg-black/10">
                <div className="modal-box bg-slate-50 justify-center w-1/2 flex flex-col text-black shadow rounded-xl p-10 space-y-5">
                    <p className="text-center text-xl">join this group?</p>
                    <div className="w-full flex flex-row justify-between text-white h-9 gap-4 my-0">
                        <button onClick={() => setOpenDialog(false)} className="w-1/2 border rounded-xl bg-red-500">
                            cancel
                        </button>
                        <button className="w-1/2 border rounded-xl bg-green-500" onClick={()=>addMember()}>
                            confirm
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
        </>
    );
}
