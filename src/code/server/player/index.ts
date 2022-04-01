import "@citizenfx/server"
import { getIdentifier } from "@server/utils";
import playerService from "@server/player/player.service";

import { characterService } from "@server/player/character/character.service";
import { Character } from "@server/player/character/character";

import logger from "@shared/logger.service";
import { RandomSSN } from "ssn";

interface IDeferrals {
    defer: () => void;
    update: (message: string) => void;
    pCard: any;
    done: (reason?: string) => void;
}

AddEventHandler("playerConnecting", async (name: string, setKickReason: (msg: string) => void, deferrals: IDeferrals) => {
    const src = global.source;
    deferrals.defer();
    deferrals.update("Running Flight Checks");
    logger.info(`[${GetPlayerName(src.toString())}] is connecting the server.`);

    const identifier = await getIdentifier(src, "steam");
    if (!identifier) return deferrals.done("Coundn't Detect your STEAM Identifier | Please make sure STEAM is running then try again.");

    deferrals.done();
})

AddEventHandler("playerDropped", async () => {
    const src = global.source;
    const Player = await playerService.getPlayer(src);

    if (!Player) return playerService.removePlayer(src);

    logger.info(`${Player.name} has left the server.`)
})

RegisterCommand("createCharacter",async  function(source: any, args: any, raw: any) {
    const player = await playerService.getPlayer(source)
    new characterService(player).newCharacter(new Character({
        ssn: new RandomSSN('CA').value().toString(),
        fn: args[0],
        ln: args[1],
        dob: args[2],
        phoneNumber: args[3],
        email: args[4],
        address: args[5],
        inventory: [],
        clothing: {},
        cHistory: []
    })).then(character => {
        logger.debug(character)
    })
}, false)

RegisterCommand("deleteCharacter", async function(source: any, args: any, raw: any) {
    const player = await playerService.getPlayer(source)
    new characterService(player).deleteCharacter(args[0])
}, false)

RegisterCommand("loadCharacter", async function(source: any, args: any, raw: any) {
    const player = await playerService.getPlayer(source)
    new characterService(player).loadCharacter(args[0]).then(character => {
        logger.debug(JSON.stringify(character))
    })
}, false)