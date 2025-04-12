import mongoose, { Schema, Types, Document } from "mongoose";

interface IChat extends Document {
    _id: Types.ObjectId;
    name: string;
    members: Types.ObjectId[];
}

const ChatSchema: Schema<IChat> = new Schema({
    name: {
        type: String,
        required: true,
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
        }
    ]
});

const Chat = mongoose.model<IChat>("Chat", ChatSchema);

export default Chat;
