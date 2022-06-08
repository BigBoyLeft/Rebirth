import { IDeferrals } from "@server/systems/steps.system";

export default class Banking {
  static init() {
    console.log("[Rebirth] Banking plugin loaded");
    global.exports["Rebirth"].injectLoginStep(
      (src: number, deferrals: IDeferrals) => {
        console.log("Player Src:", src);
        global.exports["Rebirth"].nextStep(src);
      }
    );
  }
}
