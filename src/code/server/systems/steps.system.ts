import Logger from "@server/modules/logger";
import { IAccount } from "@server/shemas/account/account";
import LoginController from "@server/systems/login.system";
import AccountController from "@server/systems/account.system";
import { timeUntil } from "@server/utils";
import AdminController from "@server/systems/admin.system";
import { IBan } from "@server/shemas/account/bans";

export interface IDeferrals {
  defer: () => void;
  update: (message: string) => void;
  pCard: any;
  done: (reason?: string) => void;
}

const steps: Array<(src: number, deferrals: IDeferrals) => void> = [
  (src: number, deferrals: IDeferrals) => {
    StepSystem.nextStep(src);
  },
];

const timelines: {
  [key: number]: {
    index: number;
    deferrals: IDeferrals;
  };
} = {};

export default class StepSystem {
  static init() {
    LoginController.init();
    StepSystem.injectLoginStep((src: number, deferrals: IDeferrals) => {
      StepSystem.nextStep(src);
    });
  }

  static initPlayer(src: number, deferrals: IDeferrals) {
    if (!src) return;

    timelines[src] = {
      index: -1,
      deferrals: deferrals,
    };
    StepSystem.nextStep(src);
  }

  static injectLoginStep(
    callback: (src: number, deferrals: IDeferrals) => void
  ) {
    steps.push(callback);
    return steps.indexOf(callback);
  }

  static ejectLoginStep(index: number) {
    steps.splice(index, 1);
  }

  static nextStep(src: number) {
    if (!src || !timelines[src]) return;
    if (timelines[src].index + 1 >= steps.length) {
      StepSystem.accountLogin(src);
      return;
    }

    timelines[src].index = timelines[src].index + 1;
    const step = steps[timelines[src].index];
    step(src, timelines[src].deferrals);
  }

  static async accountLogin(src: number) {
    if (!src) return;

    let account: IAccount = await AccountController.getAccount(src);
    const deferrals = timelines[src].deferrals;

    if (!account) {
      account = await AccountController.createAccount(src);

      if (!account) {
        deferrals.done("Account creation failed");
        return;
      }
    }

    // @ts-ignore
    const ban: IBan = await AdminController.isBanned(src);
    if (ban) {
      // @ts-ignore
      if (ban.revoked) {
        deferrals.update(`Welcome Back ${account.name}. We hope you have rethought your decisions. Remember to follow the rules and Have a good time here at Rebirth [○●●]`);
        await sleep(750);
        deferrals.update(`Welcome Back ${account.name}. We hope you have rethought your decisions. Remember to follow the rules and Have a good time here at Rebirth [○○●]`);
        await sleep(750);
        deferrals.update(`Welcome Back ${account.name}. We hope you have rethought your decisions. Remember to follow the rules and Have a good time here at Rebirth [○○○]`);
        await sleep(750);
        deferrals.update(`Welcome Back ${account.name}. We hope you have rethought your decisions. Remember to follow the rules and Have a good time here at Rebirth [○●●]`);
        await sleep(750);
        deferrals.update(`Welcome Back ${account.name}. We hope you have rethought your decisions. Remember to follow the rules and Have a good time here at Rebirth [○○●]`);
        await sleep(750);
        deferrals.update(`Welcome Back ${account.name}. We hope you have rethought your decisions. Remember to follow the rules and Have a good time here at Rebirth [○○○]`);
        await sleep(750);
        deferrals.update(`Welcome Back ${account.name}. We hope you have rethought your decisions. Remember to follow the rules and Have a good time here at Rebirth [○●●]`);
        await sleep(750);
        deferrals.update(`Welcome Back ${account.name}. We hope you have rethought your decisions. Remember to follow the rules and Have a good time here at Rebirth [○○●]`);
        await sleep(750);
        deferrals.update(`Welcome Back ${account.name}. We hope you have rethought your decisions. Remember to follow the rules and Have a good time here at Rebirth [○○○]`);
        await sleep(750);
        deferrals.done();
      } else {
        deferrals.done(`[👮] You are Banned from Rebirth

        Reason: ${ban.reason || "No reason given"}
        Banned By: ${ban.author || "Unknown"}
        Ban Expires In: ${
          ban.expire === "perm" ? "Permanent" : timeUntil(new Date(ban.expire))
        }`);

        AdminController.updateBan(ban, src);
      }
      return;
    }

    deferrals.done();
  }
}
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
