import Logger from "@server/modules/logger";
import {IAccount} from "@server/shemas/account/account";

export default class PlayerController {
    static addPlayer(src: number, player: IAccount) {
        Player(src).state.set("account", player, true);
        emitNet("Rebirth:player:client:characterSelect", src);
    }

    static getPlayer(src: number) {
        return Player(src).state.account;
    }

    static updatePlayer(src: number, player: IAccount) {
        Player(src).state.set("account", player, false);
    }

    static updatePlayerVariable(src: number, key: string, value: any) {
        Player(src).state.account[key] = value;
    }

    static getPlayerVariable(src: number, key: string) {
        return Player(src).state.account[src][key];
    }
}