"use strict";
import "@citizenfx/server";
import path from "path";
import Database from "@database"

import logger from "@shared/logger.service";
import { sleep } from "@server/utils";
import playerService from "@server/player/player.service";

export var frameworkInitialized = false

onNet("Rebirth:Client:Init", async () => {
    let src = source
    const tick = setInterval(() => {
        if (frameworkInitialized) {
            playerService.newPlayer(src).then(player => {
                if (!player) return;
                // logger.debug(player);
                emitNet("Rebirth:Server:Player:Connected", player);
                clearInterval(tick);
            });
        }
    }, 1000)
})

export class ServerClass {
    constructor() {
        on('onServerResourceStart', this.initFramework)
    }
    database: any;

    initFramework = async (resourceName: string) => {
        require('@server/player');
        await sleep(2000)
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
                `].join("\n")
            )
            logger.info("[Rebirth] Framework initializing.");
            this.loadPlugins();
            this.loadDatabase();
            frameworkInitialized = true;
        }
    };

    loadPlugins = async () => {

    };

    loadDatabase = async () => {
        this.database = new Database()
        await this.database.connect().then(() => {
            logger.info("[Rebirth] Database connected.");
        })
    }
}

const server = new ServerClass()
global.exports("server", () => {
    return server
})