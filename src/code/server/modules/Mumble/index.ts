import logger from "@shared/logger.service";
import PhoneModule from "@server/modules/Mumble/phone";
import RadioModule from "@server/modules/Mumble/radio";

class Mumble {
    private players: Map<number, any>;
    constructor() {
        this.init();
        this.players = new Map();
    }

    async init() {
        onNet("playerJoining", () => {
            let src = global.source;
            if (!this.players.get(src)) {
                this.players.set(src, {
                    radio_freq: 0,
                    phone_freq: 0,
                })
            }
        })

        onNet("playerDropped", () => {
            let src = global.source;
            let player = this.players.get(src);
            if (!player) return;
            this.players.delete(src);
        })

        logger.info("[Rebirth] Loaded Mumble Module.");
    }

    async addPlayerToRadio(source: number, frequency: number) {
        if (this.players.get(source)) {
            await RadioModule.joinRadio(source, frequency);
            this.players.set(source, {
                ...this.players.get(source),
                radio_freq: frequency,
            })
        }
    }
    
    async removePlayerFromRadio(source: number) {
        if (this.players.get(source)) {
            await RadioModule.leaveRadio(source);
            this.players.set(source, {
                ...this.players.get(source),
                radio_freq: 0,
            })
        }
    }
}

export default new Mumble();
