import { Schema, model, Document } from "mongoose";

export interface IOffice {
    owner: string,
    building: string,
    oNum: string,
    storages: any[],
    allowedCid: string[],
    model: string,
    price: number,
}

export const OfficeSchema = new Schema({
    owner: String,
    building: String,
    oNum: String,
    storages: Object,
    allowedCid: Object,
    model: String,
    price: Number,
});

export default model<IOffice>("offices", OfficeSchema);