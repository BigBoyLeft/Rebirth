import { characterService } from "@server/player/character/character.service";
import { Character } from "@server/player/character/character";
import PlayerSchema from "@schemas/player";
import { RandomSSN } from "ssn";
import playerService from "@server/player/player.service";
import { debug } from "@shared/logger.service";
import { randomFromRange, randomNumbers, randomString } from "@server/utils";

import CB from "@server/modules/cb";

function generateSSN(): string {
  const first = `${randomString(1, "1234578")}${randomNumbers(2).join("")}`;
  const middle = `${randomString(1, "123456789")}${randomNumbers(1).join("")}`;
  const end = `${randomString(1, "123456789")}${randomNumbers(3).join("")}`;

  return `${first}${middle}${end}`;
}

class CharacterSelect {
  constructor() {
    this.callbacks();
  }

  callbacks() {
    CB.register("Character:Delete", async (data: any) => {
      return new Promise(async (resolve, reject) => {
        let src = global.source;
        const player = await playerService.getPlayer(src);
        let response = await new characterService(player).deleteCharacter(
          data.ssn
        );
        resolve(response);
      });
    });
    CB.register("Character:Create", async (data: any) => {
      return new Promise(async (resolve, reject) => {
        let src = global.source;
        const player = await playerService.getPlayer(src);
        PlayerSchema.find(
          { "data.characters.ln": data.ln },
          { "data.characters.$": 1 }
        ).then(async (FCharacter: any) => {
          const newCharacter = await new characterService(player).newCharacter(
            new Character({
              ssn: generateSSN(),
              fn: data.fn,
              ln: data.ln,
              dob: data.dob,
              gender: data.gender,
              phoneNumber: Math.floor(
                1000000000 + Math.random() * 9000000000
              ).toString(),
              email: `${data.fn.toLowerCase()}${data.ln.toLowerCase()}@rebirth.net`,
              pAddress: "NONE",
              inventory: [],
              clothing: {},
              cHistory: [],
            })
          );
          resolve(newCharacter);
        });
      });
    });
    CB.register("Character:Login", async (data: any) => {
      return new Promise(async (resolve, reject) => {
        let src = global.source;
        debug("SRC:" + src);
        const player = await playerService.getPlayer(src);
        new characterService(player)
          .loadCharacter(data.ssn)
          .then(async (character: Character) => {
            let status = await playerService.loadCharacter(src, character);
            resolve(status);
          });
      });
    });
  }
}

export default new CharacterSelect();
