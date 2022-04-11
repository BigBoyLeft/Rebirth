import { Schema, model, Document } from "mongoose";

export interface IVehicle {
    owner: string,
    trunk: any[],
    gloveBox: any[],
    licensePlate: string,
    vin: string,
    model: string,
    make: string,
    year: number,
    color: string,
    data: JSON,
    price: number,
}

export const VehicleSchema = new Schema({
    owner: String,
    trunk: Object,
    gloveBox: Object,
    licensePlate: String,
    vin: String,
    model: String,
    make: String,
    year: Number,
    color: String,
    data: Object,
    price: Number,
});

export default model<IVehicle>("vehicles", VehicleSchema);