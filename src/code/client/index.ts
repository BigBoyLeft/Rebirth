import "@citizenfx/client";
const Config = require("@Config");

export class ClientClass {
  constructor() {
    on("onClientResourceStart", this.onClientResourceStart);
  }

  onClientResourceStart = async (resourceName: string) => {
    if (resourceName === GetCurrentResourceName()) {
      debug(
        [
          `
\x1b[36m######                                      
\x1b[36m#     # ###### #####  # #####  ##### #    # 
\x1b[36m#     # #      #    # # #    #   #   #    # 
\x1b[36m######  #####  #####  # #    #   #   ###### 
\x1b[36m#   #   #      #    # # #####    #   #    # 
\x1b[36m#    #  #      #    # # #   #    #   #    # 
\x1b[36m#     # ###### #####  # #    #   #   #    # 
        `,
        ].join("\n")
      );
      debug("[Rebirth]: Client initialized with DeveloperMode enabled.");
      console.log("[Rebirth]: Framework initializing.");
      await require("@client/modules");

      setTimeout(() => {
        emitNet("Rebirth:Client:Init");
      }, 500)
    }
  };
}

const client = new ClientClass();

export const debug = (...args: any[]) => {
  if (Config.DeveloperMode) {
    console.log(...args);
  }
};