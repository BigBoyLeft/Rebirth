"use strict";
import "@citizenfx/server";
import path from "path";
import Database from "@database"

import logger from "@shared/logger.service";
import playerService from "@server/player/player.service";

export var frameworkInitialized = false

onNet("Rebirth:Client:Init", async () => {
    let src = source
    const tick = setInterval(() => {
        if (frameworkInitialized) {
            playerService.newPlayer(src).then(player => {
                if (!player) return;
                // logger.debug(player);
                emitNet("Rebirth:client:Player:Connected", src, player);
                clearInterval(tick);
            });
        }
    }, 1000)
});

export class ServerClass {
    constructor() {
        on('onServerResourceStart', this.initFramework)
    }
    database: any;

    initFramework = async (resourceName: string) => {
        require('@server/player');
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
            await this.loadDatabase();
            await require('@server/modules/Discord')
            await require('@server/modules/S3')
            frameworkInitialized = true;
        }
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