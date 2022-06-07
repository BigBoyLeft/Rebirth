import Logger from "@server/modules/logger";
import { IAccount } from "@server/shemas/account/account";
import StepSystem from "@server/systems/steps.system";
import PlayerSchema from "@server/shemas/account/account";
import { getIdentifier } from "@server/utils";

/**
 * Dev Mode Logic
 * @exports
 * @class DevMode
 */

export default class DevMode {
  static async login(src: number, deferrals: any) {
    Logger.warning(`${GetPlayerName(src)} Logged in through Developer Mode`);
    const identifier = await getIdentifier(src, "steam");
    const accounts: IAccount[] = await PlayerSchema.find({
        identifiers: { $in: [identifier] },
    })
    const account: IAccount = accounts[0];

    StepSystem.initPlayer(src, deferrals);
  }
}
