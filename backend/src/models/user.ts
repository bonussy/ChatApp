import mongoose, {Schema, Document, Types} from "mongoose";

interface IUser extends Document {
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    profileIcon: string;
    createdAt: Date;
}

const userSchema: Schema<IUser> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileIcon: {
        type: String,
        default: "icon1"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
