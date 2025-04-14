type Chat = {
    _id: string;
    name: string;
    members: string[];
    isGroupChat: boolean;
    createdAt: Date;
}

export default function GroupCard({chat} : {chat : Chat}) {
    return (
        <div className="border rounded-lg text-center p-8 space-y-3">
            <p className="font-semibold text-3xl">{chat.name}</p>
            <div>
                {
                    chat.members.map((member,index)=>(
                        <p key={member}>{member}</p>
                    ))
                }
            </div>
                
        </div>
    )
}