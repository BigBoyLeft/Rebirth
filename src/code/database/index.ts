import logger from "@shared/logger.service";
import { connect, connections } from "mongoose";
const Config = require("@/Config");

/**
 * Database Examples
 *
 * @Description Finds One Player with the name "Left"
 * @returns Object
 *
 * import Players from "@schemas/player"
 *
 * ```typescript
 * const player = await Players.findOne().where("name").equals("Left");
 * console.log(player)
 * ```
 * @Description Finds One Player with the name "Left"
 * @returns Array
 *
 * ```typescript
 * const player = await Players.find().where("name").equals("Left");
 * console.log(player)
 * ```
 */

let collections = ["players", "test"];

export default class Database {
    private connection: any;
    async connect() {
        this.connection = await connect(Config.DATABASE_CONNECTION);
        return true;
    }
}
