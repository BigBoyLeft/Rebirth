import { Schema, model, Document } from 'mongoose';

export interface IPlayer {
    cid: string,
    name: string,
    identifiers: string[],
    tokens: string[],
    data: JSON,
    joined: Date, 
}

export const PlayerSchema = new Schema({
    cid: String,
    name: String,
    identifiers: [String],
    tokens: [String],
    data: JSON,
    joined: Date,
});

export default model<IPlayer>("players", PlayerSchema);