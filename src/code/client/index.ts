import "@citizenfx/client";
import TickService from "@shared/tick.service";

// export const tick = new TickService();

export class ClientClass {
  constructor() {
    on("onClientResourceStart", this.onClientResourceStart);
  }

  onClientResourceStart = async (resourceName: string) => {
    if (resourceName === GetCurrentResourceName()) {
        console.log(
            [`
\x1b[36m######                                      
\x1b[36m#     # ###### #####  # #####  ##### #    # 
\x1b[36m#     # #      #    # # #    #   #   #    # 
\x1b[36m######  #####  #####  # #    #   #   ###### 
\x1b[36m#   #   #      #    # # #####    #   #    # 
\x1b[36m#    #  #      #    # # #   #    #   #    # 
\x1b[36m#     # ###### #####  # #    #   #   #    # 
        `].join("\n"));
      console.log("[Rebirth]: Framework initializing.");

      await require("@client/modules");
      emitNet("Rebirth:Client:Init");
    }
  };
}

const client = new ClientClass();
global.exports("client", () => {
  return client;
});
