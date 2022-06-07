import Logger from "@server/modules/logger";
import AccountSchema from "@server/shemas/account/account";
import BanSchema, { IBan } from "@server/shemas/account/bans";
import { getIdentifier, getIdentifiers, timeUntil } from "@server/utils";

export default class AdminController {
  static async kickPlayer(
    src: number,
    reason: string = "You have been kicked from Rebirth",
    author: string
  ): Promise<boolean> {
    if (!src) return false;
    DropPlayer(
      src.toString(),
      `[👮] You have been Kicked from Rebirth RP
        Reason: ${reason}
        Kicked By: ${author || "Unknown"}`
    );
  }

  static async updateBan(ban: IBan, src: number) {
    let needsUpdate = false;
    let identifiers: string[] = [];
    let tokens: string[] = [];
    try {
      identifiers = await getIdentifiers(src);
      tokens = getPlayerTokens(src);
    } catch (error) {
      Logger.error(`Failed to get identifiers for src: ${src}`);
      return;
    }

    for (const identifier of identifiers) {
      if (!ban.identifiers.includes(identifier)) {
        ban.identifiers.push(identifier);
        if (!needsUpdate) needsUpdate = true;
      }
    }

    for (const token of tokens) {
      if (!ban.tokens.includes(token)) {
        ban.tokens.push(token);
        if (!needsUpdate) needsUpdate = true;
      }
    }

    if (needsUpdate) {
      BanSchema.findOneAndUpdate(
        { _id: ban._id },
        {
          $set: {
            identifiers: ban.identifiers,
            tokens: ban.tokens,
          },
        },
        { new: true },
        function (error: any, document: any) {
          if (error) {
            Logger.error(`Failed to update BAN: [${ban._id}]`);
            return;
          }
          Logger.info(`Updated Ban: [${ban._id}]`);
        }
      );
    }
  }

  static async banPlayer(
    data: {
      reason: string;
      author: string;
      expire: number | string;
      identifier?: string[];
      src?: number;
    } = {
      reason: "You have been banned from Rebirth",
      author: "Unknown",
      expire: "perm",
    }
  ): Promise<boolean> {
    if (!data.identifier && !data.src) return false;

    if (data.identifier) {
      let identifiers: string[] = [];
      let tokens: string[] = [];
      const accounts = await AccountSchema.find({
        "&or": [
          { identifiers: { $in: data.identifier } },
          { tokens: { $in: data.identifier } },
        ],
      });

      for (const account of accounts) {
        for (const identifier of account.identifiers) {
          if (!identifiers.includes(identifier)) identifiers.push(identifier);
        }

        for (const token of account.tokens) {
          if (!tokens.includes(token)) tokens.push(token);
        }
      }

      const ban: IBan = new BanSchema({
        identifiers: identifiers,
        tokens: tokens,
        reason: data.reason,
        author: data.author,
        expire: data.expire,
      });

      ban.save(function (error: any) {
        if (error) {
          Logger.error(
            `Failed to ban Identifiers: [${data.identifier}] | ${error}`
          );
          return false;
        }
        Logger.info(`Banned Identifiers: [${data.identifier}]`);
        return true;
      });

      for (const player of getPlayers()) {
        console.log('here')
        const identifiers2 = await getIdentifiers(Number(player));
        const tokens2 = getPlayerTokens(player);
        if (
          identifiers2.some((identifier) => identifiers.includes(identifier)) ||
          tokens2.some((token) => tokens.includes(token))
        ) {
          console.log('here2')
          console.log(ban);
          await AdminController.kickPlayer(
            Number(player),
            `${data.reason}
            Ban Expires In: ${
              ban.expire === "perm"
                ? "Permanent"
                : timeUntil(new Date(ban.expire))
            }`,
            data.author
          );
        }
      }
    } else if (data.src) {
      let identifiers: string[] = [];
      let tokens: string[] = [];

      try {
        identifiers = await getIdentifiers(data.src);
        tokens = getPlayerTokens(data.src);
      } catch (error) {
        Logger.error(`Failed to get identifiers for src: ${data.src}`);
        return;
      }

      const ban: IBan = new BanSchema({
        identifiers: identifiers,
        tokens: tokens,
        reason: data.reason,
        author: data.author,
        expire: data.expire,
      });

      ban.save(function (error: any) {
        if (error) {
          Logger.error(`Failed to ban User: [${data.src}] | ${error}`);
          return false;
        }
        Logger.info(`Banned User: [${data.src}]`);
        return true;
      });

      await AdminController.kickPlayer(
        data.src,
        `${data.reason}
        Ban Expires In: ${
          data.expire === "perm"
            ? "Permanent"
            : timeUntil(new Date(data.expire))
        }`,
        data.author
      );
    }
  }

  static async isBanned(src: number): Promise<IBan | Object> {
    if (!src) return null;

    let identifiers: string[] = [];
    let tokens: string[] = [];

    try {
      identifiers = await getIdentifiers(src);
      tokens = getPlayerTokens(src);
    } catch (error) {
      Logger.error(`Failed to get identifiers for src: ${src}`);
      return;
    }

    const ban: IBan = await BanSchema.findOne({
      identifiers: { $in: [identifiers] },
      tokens: { $in: [tokens] },
    });

    if (ban) {
      if (ban.expire !== "perm") {
        if (new Date(ban.expire) < new Date()) {
          await BanSchema.deleteOne({ _id: ban._id });
          return {
            revoked: true,
          };
        }
      }
    }

    return ban;
  }
}

RegisterCommand(
  "ban",
  (src: number) => {
    AdminController.banPlayer({
      reason: "Get Fucked Kid",
      author: "Admin",
      expire: "perm",
      src: src,
    });
  },
  false
);
RegisterCommand(
  "banid",
  (src: number, args: string[]) => {
    // add 10 seconds onto expire
    AdminController.banPlayer({
      reason: "Get Fucked Kid",
      author: "Admin",
      expire: "Sun Jan 22 2023 23:03:29 GMT-0800 (Pacific Standard Time)",
      identifier: ["steam:11000014827a7ee", "ip:192.168.56.1"],
    });
  },
  false
);
RegisterCommand(
  "bantemp",
  (src: number, args: string[]) => {
    // add 10 seconds onto expire
    AdminController.banPlayer({
      reason: "Get Fucked Kid",
      author: `Admin`,
      expire: `${new Date(new Date().getTime() + 20 * 1000)}`,
      identifier: ["steam:11000014827a7ee", "ip:192.168.56.1"],
    });
  },
  false
);