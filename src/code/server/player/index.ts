import "@citizenfx/server";
import { getIdentifier } from "@server/utils";
import playerService from "@server/player/player.service";

import DiscordClient from "@server/modules/Discord";

import { frameworkInitialized } from "@server";

import { debug } from "@shared/logger.service";
import { characterService } from "@server/player/character/character.service";

const Config = require("@Config");

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
    }, 1000);

    async function connect() {
        deferrals.update("Running Flight Checks");
        debug(`[${GetPlayerName(src.toString())}] is connecting the server.`);
        
        const identifier = await getIdentifier(src, "steam");
        if (!identifier) return deferrals.done("Coundn't Detect your STEAM Identifier | Please make sure STEAM is running then try again.");
        
        if (Config.DeveloperMode) {
            debug(`[${GetPlayerName(src.toString())}] has bypassed Flight Checks because Developer Mode is enabled.`);
            deferrals.done();
        }


        const discord = (await getIdentifier(src, "discord"));
        if (!discord) return deferrals.done("Coundn't Detect your Discord Identifier | Please make sure Discord is running then try again.");
        DiscordClient.hasRole(discord, Config.Discord.WhitelistRole).then((status: string) => {
            if (status === "NOTFOUND") {
                return deferrals.done(`You are not in our Discord Server | Please make sure Discord is running then try again. | ${Config.Discord.DiscordInvite}`);
            } else if (status === "NO") {
                return deferrals.done(`You are not Whitelisted | Please submit a whitelist application in our discord. | ${Config.Discord.DiscordInvite}`);
            } else if (status === "YES") {
                deferrals.done();
            } else {
                return deferrals.done("Unknown Error | Please try again.");
            }
        });
    }
});

AddEventHandler("playerDropped", async () => {
    const src = global.source;
    const Player = await playerService.getPlayer(src);

    if (!Player) return playerService.removePlayer(src);

    debug(`${Player.name} has left the server.`);
});

onNet("Rebirth:Client:Init", () => {
    let src: any = global.source;
    debug("[Rebirth]: Client initialized with DeveloperMode enabled.");
    const tick = setInterval(() => {
      if (frameworkInitialized) {
        clearInterval(tick);
        playerService.newPlayer(src).then(async (player) => {
          if (!player) {
            DropPlayer(
              src,
              "Failed to create player object. Please contact support"
            );
            clearInterval(tick);
            return;
          }
          let characters = await new characterService(player).getCharacters();
          emitNet(
            "Rebirth:client:Player:Connected",
            src,
            player,
            characters
          );
        });
      }
    }, 1000);
  });