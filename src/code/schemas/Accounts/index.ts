import { Schema, model, Document } from "mongoose";

export interface IAccount {
    accountNumber: string;
    routingNumber: string;
    authorizedUsers: string[];
    balance: number;
}

export const AccountSchema = new Schema({
    accountNumber: String,
    routingNumber: String,
    authorizedUsers: Array,
    balance: Number,
});

export default model<IAccount>("accounts", AccountSchema);