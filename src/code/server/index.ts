"use strict";
import "@citizenfx/server";
import path from "path";
import Database from "@database";

import logger from "@shared/logger.service";
import playerService from "@server/player/player.service";
import { characterService } from "@server/player/character/character.service";

export var frameworkInitialized = false;

onNet("Rebirth:Client:Init", () => {
    let src = source;
    const tick = setInterval(() => {
        if (frameworkInitialized) {
            playerService.newPlayer(src).then(async (player) => {
                if (!player) return;
                // logger.debug(player);
                emitNet("Rebirth:client:Player:Connected", src, player);
                let characters = await new characterService(player).getCharacters();
                TriggerClientEvent("Rebirth:server:Character:Init", src, characters);
                clearInterval(tick);
            });
        }
    }, 1000);
});

export class ServerClass {
    constructor() {
        on("onServerResourceStart", this.initFramework);
    }
    database: any;

    initFramework = async (resourceName: string) => {
        require("@server/player");
        if (GetCurrentResourceName() === resourceName) {
            console.log(
                [
                    `
\x1b[36m######
\x1b[36m#     # ###### #####  # #####  ##### #    #
\x1b[36m#     # #      #    # # #    #   #   #    #
\x1b[36m######  #####  #####  # #    #   #   ######
\x1b[36m#   #   #      #    # # #####    #   #    #
\x1b[36m#    #  #      #    # # #   #    #   #    #
\x1b[36m#     # ###### #####  # #    #   #   #    #
                `,
                ].join("\n")
            );
            logger.info("[Rebirth] Framework initializing.");
            await this.loadDatabase();
            await require("@server/modules");
            frameworkInitialized = true;
        }
    };

    loadDatabase = async () => {
        this.database = new Database();
        await this.database.connect().then(() => {
            logger.info("[Rebirth] Database connected.");
        });
    };
}

const server = new ServerClass();
global.exports("server", () => {
    return server;
});
