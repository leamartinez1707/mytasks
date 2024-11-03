import mongoose, { Schema, Document } from "mongoose";


export interface IAuth extends Document {
    email: string
    password: string
    name: string
    confirmed: boolean
}

const authSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    confirmed: {
        type: Boolean,
        default: false,
        required: true,
    }
});

const Auth = mongoose.model<IAuth>("User", authSchema);

export default Auth;