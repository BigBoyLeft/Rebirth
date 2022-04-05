import { Character } from "@server/player/character/character";
import { Player } from "@server/player/player";
import PlayerSchema from "@schemas/player";
import logger from "@shared/logger.service";
import { getIdentifier, getIdentifiers, generateuuid } from "@server/utils";
import { ParseSSN, RandomSSN } from "ssn";

export class characterService {
    private Player: Player;

    constructor(player: Player) {
        this.Player = player;
    }

    async newCharacter(charData: Character): Promise<Character> {
        return new Promise((resolve, reject) => {
            PlayerSchema.findOneAndUpdate(
                {
                    cid: this.Player.cid,
                },
                {
                    $push: {
                        "data.characters": charData,
                    },
                },
                (err: any) => {
                    // if (err) return logger.error(err)
                    logger.info(`[${this.Player.name}] Created Character ${charData.fn + " " + charData.ln}`);
                    resolve(charData);
                }
            );
        });
    }

    async deleteCharacter(ssn: string) {
        PlayerSchema.findOneAndUpdate(
            {
                cid: this.Player.cid,
            },
            {
                $pull: {
                    "data.characters": {
                        ssn: ssn,
                    },
                },
            },
            (err: any) => {
                if (err) return logger.error(err);
                logger.info(`[${this.Player.name}] Deleted Character with SSN: ${ssn}`);
            }
        );
    }

    async getCharacters(): Promise<Character[]> {
        return PlayerSchema.findOne(
            {
                cid: this.Player.cid,
            },
            {
                "data.characters": 1,
            },
        ).then((Characters: any) => {
            console.log(JSON.stringify(Characters.data.characters))
            return Characters.data.characters;
        });
    }

    async loadCharacter(ssn: string): Promise<Character> {
        return PlayerSchema.find(
            {
                "data.characters.ssn": ssn,
            },
            {
                "data.characters.$": 1,
            }
        ).then((Fcharacter: any) => {
            let character = Fcharacter[0].data.characters[0];
            if (character.ssn !== ssn) return logger.error(`[Character Service] Attempted to load character with SSN: ${ssn} | but recieved ${character.snn}`);
            return character;
        });
    }
}
