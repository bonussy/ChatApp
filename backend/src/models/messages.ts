import mongoose, { Schema, Types, Document } from "mongoose";

// interface IMessages extends Document {
//     _id: Types.ObjectId;
//     sender: Types.ObjectId;
//     chat: Types.ObjectId;
//     text: string;
//     timestamp: Date;    
//     reactions: {
//         type: Map<string, Types.ObjectId[]>; // Map of emoji to array of user IDs
//         default: {};
//     }
// }

// const MessageSchema: Schema<IMessages> = new Schema({
//     sender: {
//         type: Schema.Types.ObjectId,
//         ref: "users",
//         required: true,
//     },
//     chat: { 
//         type: Schema.Types.ObjectId,
//         ref: "chats",
//         required: true,
//     },
//     text: { 
//         type: String,
//         required: true,
//     },
//     timestamp: { 
//         type: Date,
//         default: Date.now,
//     },
//     reactions: {
//         type: Map,
//         of: [Schema.Types.ObjectId],
//         default: {},
//     }
// });

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    reactions: {
      type: Map,
      of: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      default: {},
    }
});

// const Message = mongoose.model<IMessages>("Message", MessageSchema);
const Message = mongoose.model("Message", messageSchema);

export default Message;