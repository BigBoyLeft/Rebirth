import { Schema, model, Document } from "mongoose";

export interface IApartment {
    owner: string,
    building: string,
    aNum: string,
    storages: any[],
    furnitureData: any[],
    allowedCid: string[],
    model: string,
    price: number,
}

export const ApartmentSchema = new Schema({
    owner: String,
    building: String,
    aNum: String,
    storages: Object,
    furnitureData: Object,
    allowedCid: Object,
    model: String,
    price: Number,
});

export default model<IApartment>("apartments", ApartmentSchema);