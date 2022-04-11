import { Schema, model, Document } from "mongoose";

export interface IWarehouse {
    owner: string,
    address: string,
    storages: any[],
    vehicles: any[],
    furnitureData: any[],
    allowedCid: string[],
    model: string,
    price: number,
}

export const WarehouseSchema = new Schema({
    owner: String,
    address: String,
    storages: Object,
    vehicles: Object,
    furnitureData: Object,
    allowedCid: Object,
    model: String,
    price: Number,
});

export default model<IWarehouse>("warehouses", WarehouseSchema);