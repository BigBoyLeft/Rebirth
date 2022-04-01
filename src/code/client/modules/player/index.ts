import { Player } from "@client/modules/player/player";

import { tick } from "@client";

class playerService {
    Player: any = "";
    constructor() {
        onNet("Rebirth:client:Player:Connected", (player: { _doc: Player }) => {
            this.Player = player._doc;
            this.initPlayer();
        });
    }

    async initPlayer() {
        // FreezeEntityPosition(PlayerPedId(), false);
        // SetEntityCoords(PlayerPedId(), -479.39, 5323.26, 80.0, true, true, true, true);
        // SetEntityHeading(PlayerPedId(), -85.0);
        require("@client/modules/player/hud")

        setInterval(() => {
            console.log('update')
        }, 300000)
    }
}

export default new playerService();
