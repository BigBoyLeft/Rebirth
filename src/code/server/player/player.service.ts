import Player from "./player";
import PlayerSchema from "@schemas/player";
import logger from "@shared/logger.service";
import { getIdentifier, getIdentifiers, generateuuid } from "@server/utils";
import { frameworkInitialized } from "@server";
import { debug } from "@shared/logger.service";

class playerService {
  private players: Map<number, Player> | any;

  constructor() {
    const tick = setInterval(() => {
      if (frameworkInitialized) {
        this.players = new Map<number, Player>();
        logger.info("[Rebirth] Loaded Player Module.");
        clearInterval(tick);
      }
    }, 100);
  }

  getPlayer(source: number): Promise<Player> {
    return this.players.get(source);
  }

  async removePlayer(source: number) {
    const player: Player = await this.getPlayer(source);
    if (!player || player.identifiers.steam === (null || "")) return;
    this.players.delete(source);
    const doc = await PlayerSchema.findOneAndUpdate(
      { cid: player.cid },
      { $set: { last_seen: new Date().toISOString() } }
    );
    this.players.set(source, doc);
  }

  async updatePermission(source: number, permission: number) {
    const player: Player = await this.getPlayer(source);
    if (!player) return;
    const doc = await PlayerSchema.findOneAndUpdate(
      { cid: player.cid },
      { $set: { PermissionLevel: permission } },
      { new: true }
    );
    this.players.set(source, doc);
  }

  getPermissionLevel(source: number) {
    const player: any = this.players.get(source);
    if (!player) return;
    return player.PermissionLevel;
  }

  updatePlayerCoords(source: number, coords: Vector3) {
    this.players.get(source);
  }

  newPlayer(source: number): Promise<Player | undefined> {
    return new Promise(async (resolve, reject) => {
      const identifier = await getIdentifier(source, "steam");
      if (!identifier) return;
      const player: Player = await PlayerSchema.findOne({
        identifiers: { $in: [identifier] },
      });

      const createPlayer = (source: number, player: Player | any) => {
        debug(`[Player Service] Loaded Player [${player.name}]`);
        this.players.set(source, player);
      };

      if (player) {
        createPlayer(source, player);
        return resolve(player);
      } else {
        let that = this;
        const newPlayer = new PlayerSchema({
          cid: generateuuid(),
          name: GetPlayerName(source.toString()),
          identifiers: await getIdentifiers(source),
          tokens: getPlayerTokens(source),
          data: {
            characters: [],
            history: [],
          },
          PermissionLevel: 0,
          joined: new Date().toISOString(),
        });
        newPlayer.save(function (err, player: any) {
          if (err) return logger.error(err);
          debug(`Creating User for [${player.name}]`);
          createPlayer(source, player);
          return resolve(player);
        });
      }
    });
  }

  async loadCharacter(
    source: number,
    character: any
  ): Promise<Player | boolean> {
    return new Promise(async (resolve, reject) => {
      const player: Player | any = await this.getPlayer(source);
      if (!player) return false;
      this.players.set(source, { ...player._doc, cCharacter: character });
      resolve(true);
    });
  }

  async getCCharacter(source: number) {
    const player: any = await this.getPlayer(source);
    if (!player) return;
    return player.cCharacter;
  }
}

export default new playerService();
