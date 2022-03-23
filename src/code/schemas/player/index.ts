import { Schema, model, Document } from 'mongoose';

export interface IPlayer {
    cid: string,
    identifiers: string[],
    tokens: string[],
    name: string,
    joined: Date, 
}

export const Player = new Schema({
    cid: String,
    identifiers: [String],
    tokens: [String],
    name: String,
    joined: Date,
});

export default model<IPlayer>("players", Player);