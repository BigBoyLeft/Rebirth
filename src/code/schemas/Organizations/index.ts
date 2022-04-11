import { Schema, model, Document } from "mongoose";

export interface IOrganization {
    name: string,
    description: string,
    accounts: any[],
    vehicles: any[],
    members: any[],
}

export const OrganizationSchema = new Schema({
    name: String,
    description: String,
    accounts: Object,
    vehicles: Object,
    members: Object,
});

export default model<IOrganization>("organizations", OrganizationSchema);