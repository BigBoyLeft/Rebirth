"use strict";
import "@citizenfx/server";
import path from "path";
import Database from "@database";

import logger from "@shared/logger.service";

export let frameworkInitialized = false;
const Config = require("@Config");

export class ServerClass {
  database: any;
  constructor() {
    on("onServerResourceStart", this.initFramework);
  }

  initFramework = async (resourceName: string) => {
    setTimeout(async () => {
      if (GetCurrentResourceName() === resourceName) {
        console.log(
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

        logger.info("[Rebirth] Framework initializing.");
        if (Config.DeveloperMode) logger.warning("[Rebirth] Developer Mode is ENABLED.");

        await this.loadDatabase();

        require("@server/player");
        await require("@server/modules");
        frameworkInitialized = true;
      }
    }, 1000);
  };

  loadDatabase = async () => {
    this.database = new Database();
    await this.database.connect().then(() => {
      logger.info("[Rebirth] Loaded Database Module.");
    });
  };
}

export default new ServerClass();