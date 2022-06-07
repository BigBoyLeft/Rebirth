import Logger from "@server/modules/logger";
import Player, { IAccount } from "@server/shemas/account/account";
import Events from "@shared/enums/connection";
import AccountController from "@server/systems/account.system";
import { generateUUID, getIdentifiers } from "@server/utils";
import { IDeferrals } from "@server/systems/steps.system";
import PlayerController from "@server/Controllers/player.controller";
import AdminController from "@server/systems/admin.system";

/**
 * Player Login Logic
 * @export
 * @class LoginController
 */

export default class LoginController {
  static init() {
    onNet(Events.START_LOGIN, LoginController.accountLogin);
    onNet("playerDisconnect", LoginController.disconnect);
  }

  static async accountLogin(): Promise<void> {
    let src = global.source;
    if (!src) return;
    let account = await AccountController.getAccount(src);
    if (!account) {
      account = await AccountController.createAccount(src);
      if (!account) {
        AdminController.kickPlayer(
          src,
          "Failed to create account",
          "Framework"
        );
        return;
      }
    }
    // @ts-ignore
    PlayerController.addPlayer(src, account._doc);
  }

  /**
   * Function that gets triggered when a player gets disconnected for any reason
   * @static
   * @param src
   * @param reason
   * @memberof LoginController
   */

  static disconnect(src: number, reason: string): void {
    if (!src) return;
    (() => {})();
    // some other logout logic [maybe delete players vehicles and other tings on logout]
  }
}

LoginController.init();
