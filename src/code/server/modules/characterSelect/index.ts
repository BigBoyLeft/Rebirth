import { characterService } from "@server/player/character/character.service";
import { Character } from "@server/player/character/character";
import PlayerSchema from "@schemas/player";
import { RandomSSN } from "ssn";
import logger from "@shared/logger.service";
import playerService from "@server/player/player.service";

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

RegisterCommand(
    "character",
    async (source: any, args: any, row: any) => {
        let src = source;
        const player = await playerService.getPlayer(src);
        let characters = await new characterService(player).getCharacters();
        TriggerClientEvent("Rebirth:server:Character:Init", src, characters);
    },
    false
);

onNet("Rebirth:server:Character:Select", async (data: any) => {
    let src = global.source;
    const player = await playerService.getPlayer(src);
    new characterService(player).loadCharacter(data.ssn).then(async (character: Character) => {
        await playerService.loadCharacter(src, character);
        TriggerClientEvent("Rebirth:server:Character:Select", src);
    });
})

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
            );

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
