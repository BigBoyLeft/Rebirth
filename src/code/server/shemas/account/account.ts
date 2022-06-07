import { Schema, model, Document } from 'mongoose';

export interface IAccount extends Document {
    cid: string,
    name: string,
    identifiers: string[],
    tokens: string[],
    data: JSON,
    PermissionLevel: number,
    joined: Date,
}

export const AccountSchema: Schema = new Schema({
    cid: String,
    name: String,
    identifiers: [String],
    tokens: [String],
    data: JSON,
    PermissionLevel: Number,
    joined: Date,
})

export default model<IAccount>("accounts", AccountSchema);