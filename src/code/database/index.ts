import { connect } from "mongoose"

/**
 * Database Examples
 * 
 * @Description Finds One Player with the name "Left"
 * @returns Object
 * 
 * ```typescript
 * const player = await Players.findOne().where('name').equals("Left");
 * console.log(player)
 * ```
 * @Description Finds One Player with the name "Left"
 * @returns Array
 * 
 * ```typescript
 * const player = await Players.find().where('name').equals("Left");
 * console.log(player)
 * ```
 */

export default class Database {
    async connect() {
        await connect("mongodb://localhost:27017/Rebirth")
        return true
    }
}