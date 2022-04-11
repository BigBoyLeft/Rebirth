import { Schema, model, Document } from "mongoose";

export interface IHouse {
    owner: string,
    address: string,
    hNum: string,
    storages: any[],
    vehicles: any[],
    furnitureData: any[],
    allowedCid: string[],
    model: string,
    price: number,
}

export const HouseSchema = new Schema({
    owner: String,
    address: String,
    hNum: String,
    storages: Object,
    vehicles: Object,
    furnitureData: Object,
    allowedCid: Object,
    model: String,
    price: Number,
});

export default model<IHouse>("houses", HouseSchema);