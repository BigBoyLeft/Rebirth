import { Player } from "./player"
import PlayerSchema from "@schemas/player"
import logger from "@shared/logger.service";
import { getIdentifier, getIdentifiers, generateuuid } from "@server/utils";
import { frameworkInitialized } from "@server";

class playerService {
    private players: Map<number, Player>;

    constructor() {
        const tick = setInterval(() => {
            if (frameworkInitialized) {
                this.players = new Map<number, Player>();
                logger.info("[Rebirth] Player Service Initialized.");
                clearInterval(tick)
            }
        }, 100)
    }

    createPlayer(source: number, player: Player): void {
        logger.info(`[Player Service] Loaded Player [${player.name}]`);
        this.players.set(source, player)
    }

    async getPlayer(source: number): Promise<Player> {
        return this.players.get(source)
    }

    removePlayer(source: number): void {
        this.players.delete(source);
        PlayerSchema.findOneAndUpdate({ name: GetPlayerName(source) }, { $set: { last_seen: new Date().toISOString() } })
    }

    async updatePlayerCoords(source: number, coords: Vector3) {
        this.players.get(source)
    }

    async newPlayer(source: number): Promise<Player | undefined> {
        const identifier = await getIdentifier(source, "steam");
        if (!identifier) return;
        const player: Player = await PlayerSchema.findOne({ name: GetPlayerName(source) })
        if (player) {
            this.createPlayer(source, player)
            return player
        } else {
            const newPlayer = new PlayerSchema({
                cid: generateuuid(),
                name: GetPlayerName(source.toString()),
                identifiers: await getIdentifiers(source),
                tokens: getPlayerTokens(source),
                data: {
                    characters: [],
                    history: [],
                },
                joined: new Date().toISOString(),
            })
            newPlayer.save(function (err, player) {
                if (err) return logger.error(err);
                logger.info(`Creating User for [${player.name}]`);
                this.createPlayer(source, player)
                return player
            })
        }
    }
}

export default new playerService();