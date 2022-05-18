import { Schema, model, Document } from "mongoose";

export interface IPlayer {
    cid: string,
    name: string,
    identifiers: string[],
    tokens: string[],
    data: JSON,
    PermissionLevel: number,
    joined: Date, 
}

export const PlayerSchema = new Schema({
    cid: String,
    name: String,
    identifiers: Array,
    tokens: Array,
    data: JSON,
    PermissionLevel: Number,
    joined: Date,
});

export default model<IPlayer>("players", PlayerSchema);