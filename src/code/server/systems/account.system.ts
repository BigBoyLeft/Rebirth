import Logger from "@server/modules/logger";
import AccountSchema, { IAccount } from "@server/shemas/account/account";
import { generateUUID, getIdentifiers } from "@server/utils";

export default class AccountController {
  /**
   * Create a new User Account
   * @static
   * @param {number} src
   * @returns {Promise<IAccount>}
   */

  static async createAccount(src: number): Promise<IAccount> {
    const newAccount = new AccountSchema({
      cid: generateUUID(),
      name: GetPlayerName(src),
      identifiers: await getIdentifiers(src),
      tokens: getPlayerTokens(src),
      data: {
        characters: [],
        history: [],
      },
      PermissionLevel: 0,
      joined: new Date().toISOString(),
    });
    const account = await newAccount.save();
    return account;
  }

  static async getAccount(src: number): Promise<IAccount> {
    let identifiers: string[] = [];
    let tokens: string[] = [];

    try {
      identifiers = await getIdentifiers(src);
      tokens = getPlayerTokens(src);
    } catch (error) {
      Logger.error(`Failed to get identifiers for src: ${src}`);
      return
    }
    const account: IAccount = await AccountSchema.findOne({
      identifiers: { $in: [identifiers] },
      tokens: { $in: [tokens] },
    });

    return account || null;
  }
}
