"use strict";
import "@citizenfx/server";
import path from "path";
import Logger from "@ptkdev/logger";
import Database from "@database"

import Players from "@schemas/player"
async function test() {
    const player = await Players.find().where('name').equals("Left");
    console.log(player)
}
test()

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class ServerMain {
    constructor() {
        on('onServerResourceStart', this.initFramework)
    }

    logger: any = new Logger({
        language: "en",
        colors: true,
        debug: true,
        info: true,
        warning: true,
        error: true,
        sponsor: true,
        write: true,
        type: "json",
        rotate: {
            size: "10M",
            encoding: "utf8",
        },
        path: {
            debug_log: path.posix.join(GetResourcePath(GetCurrentResourceName()), ".logs", "debug.log"),
            error_log: path.posix.join(GetResourcePath(GetCurrentResourceName()), ".logs", "errors.log"),
        },
    });
    database: any;

    initFramework = async (resourceName: string) => {
        await sleep(1000)
        if (GetCurrentResourceName() === resourceName) {
            console.log(
                [`
\x1b[36m######                                      
\x1b[36m#     # ###### #####  # #####  ##### #    # 
\x1b[36m#     # #      #    # # #    #   #   #    # 
\x1b[36m######  #####  #####  # #    #   #   ###### 
\x1b[36m#   #   #      #    # # #####    #   #    # 
\x1b[36m#    #  #      #    # # #   #    #   #    # 
\x1b[36m#     # ###### #####  # #    #   #   #    # 
                `
                ].join("\n")
            )
            this.logger.info("[Rebirth]: Framework initializing.");
            this.loadPlugins();
            this.loadDatabase();
        }
    };

    loadPlugins = async () => {

    };

    loadDatabase = async () => {
        this.database = new Database()
        await this.database.connect().then(() => {
            this.logger.info("Database connected.", "[Rebirth]");
        })
    }
}

const server = new ServerMain()
global.exports("server", () => {
    return server
})