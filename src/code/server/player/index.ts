import "@citizenfx/server";
import { getIdentifier } from "@server/utils";
import playerService from "@server/player/player.service";

import logger from "@shared/logger.service";

import DiscordClient from "@server/modules/Discord";

import { frameworkInitialized } from "@server";

interface IDeferrals {
    defer: () => void;
    update: (message: string) => void;
    pCard: any;
    done: (reason?: string) => void;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

AddEventHandler("playerConnecting", async (name: string, setKickReason: (msg: string) => void, deferrals: IDeferrals) => {
    const src = global.source;
    deferrals.defer();

    const interval = setInterval(() => {
        if (frameworkInitialized) {
            connect();
            clearInterval(interval);
        } else {
            deferrals.update("🛠️ Waiting for framework to initialize...");
        }
    }, 5000);

    async function connect() {
        deferrals.update("Running Flight Checks");
        logger.info(`[${GetPlayerName(src.toString())}] is connecting the server.`);

        const identifier = await getIdentifier(src, "steam");
        if (!identifier) return deferrals.done("Coundn't Detect your STEAM Identifier | Please make sure STEAM is running then try again.");

        const discord = (await getIdentifier(src, "discord")).split(`:`)[1];
        if (!discord) return deferrals.done("Coundn't Detect your Discord Identifier | Please make sure Discord is running then try again.");
        DiscordClient.hasRole(discord, "950600224232067112").then((status: string) => {
            if (status === "NOTFOUND") {
                return deferrals.done("You are not in the Discord Server | Please make sure Discord is running then try again. | https://discord.gg/7D5H7bTU");
            } else if (status === "NO") {
                return deferrals.done("You are not Whitelisted | Please submit a whitelist application in our discord. | https://discord.gg/7D5H7bTU");
            } else if (status === "YES") {
                deferrals.done();
            } else {
                return deferrals.done("Unknown Error | Please try again later.");
            }
        });
    }
});

AddEventHandler("playerDropped", async () => {
    const src = global.source;
    const Player = await playerService.getPlayer(src);

    if (!Player) return playerService.removePlayer(src);

    logger.info(`${Player.name} has left the server.`);
});