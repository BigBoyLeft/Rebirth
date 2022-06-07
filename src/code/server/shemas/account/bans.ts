import { analyzeMetafileSync } from 'esbuild';
import { Schema, model, Document } from 'mongoose';

export interface IBan extends Document {
    identifiers: string[],
    tokens: string[],
    reason: string,
    author: string,
    expire: string,
}

export const BanSchema: Schema = new Schema({
    identifiers: [String],
    tokens: [String],
    reason: String,
    author: String,
    expire: String,
})

export default model<IBan>("bans", BanSchema);