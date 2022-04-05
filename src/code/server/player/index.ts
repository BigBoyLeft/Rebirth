import "@citizenfx/server";
import { getIdentifier } from "@server/utils";
import playerService from "@server/player/player.service";

import { characterService } from "@server/player/character/character.service";
import { Character } from "@server/player/character/character";

import PlayerSchema from "@schemas/player";
import logger from "@shared/logger.service";
import { RandomSSN } from "ssn";

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

RegisterCommand(
    "createCharacter",
    async function (source: any, args: any, raw: any) {
        const player = await playerService.getPlayer(source);
        new characterService(player)
            .newCharacter(
                new Character({
                    ssn: new RandomSSN("CA").value().toString(),
                    fn: args[0],
                    ln: args[1],
                    dob: args[2],
                    gender: args[3],
                    phoneNumber: args[4],
                    email: args[5],
                    address: "NONE",
                    accounts: [],
                    inventory: [],
                    clothing: {},
                    cHistory: [],
                })
            )
            .then((character) => {
                logger.debug(character);
            });
    },
    false
);

RegisterCommand(
    "deleteCharacter",
    async function (source: any, args: any, raw: any) {
        const player = await playerService.getPlayer(source);
        new characterService(player).deleteCharacter(args[0]);
    },
    false
);

RegisterCommand(
    "loadCharacter",
    async function (source: any, args: any, raw: any) {
        const player = await playerService.getPlayer(source);
        new characterService(player).loadCharacter(args[0]).then(async (character: Character) => {
            await playerService.loadCharacter(source, character);
        });
    },
    false
);

RegisterCommand(
    "getCharacter",
    async function (source: any, args: any, row: any) {
        console.log(await playerService.getCCharacter(source));
    },
    false
);

RegisterCommand("character", async (source: any, args: any, row: any) => {
    let src = source;
    const player = await playerService.getPlayer(src);
    let characters = await new characterService(player).getCharacters();
    TriggerClientEvent('Rebirth:server:Character:Init', src, characters)
}, false);

onNet("Rebirth:server:Character:Create", async (data: any) => {
    let src = global.source;
    const player = await playerService.getPlayer(src);
    PlayerSchema.find(
        {
            "data.characters.ln": data.ln,
        },
        {
            "data.characters.$": 1,
        }
    ).then(async (Fcharacter: any) => {
        if (Fcharacter.length <= 0) {
            const newChar = await new characterService(player).newCharacter(
                new Character({
                    ssn: new RandomSSN("CA").value().toString(),
                    fn: data.fn,
                    ln: data.ln,
                    dob: data.dob,
                    gender: data.gender,
                    phoneNumber: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
                    email: `${data.fn.toLowerCase()}${data.ln.toLowerCase()}@rebirth.net`,
                    address: "NONE",
                    accounts: [],
                    inventory: [],
                    clothing: {},
                    cHistory: [],
                })
            )
                
            console.log(JSON.stringify(newChar));
            emitNet("Rebirth:server:Character:Create:Success", src, newChar);
        } else {
            emitNet("Rebirth:server:Character:Create:Error", src, "EXIST");
        }
    });
});

onNet("Rebirth:server:Character:Delete", async (data: any) => {
    let src = global.source;
    const player = await playerService.getPlayer(src);
    new characterService(player).deleteCharacter(data.ssn);
    emitNet("Rebirth:server:Character:Delete:Success", src);
});