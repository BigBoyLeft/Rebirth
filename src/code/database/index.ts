import { connect } from "mongoose";
const Config = require("@Config");

export default class Database {
    private connection: any;
    async connect() {
        this.connection = await connect(Config.Database.connect);
        return true;
    }
}
