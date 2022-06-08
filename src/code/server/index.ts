import "@citizenfx/server";
import IConfig from "@server/interfaces/IConfig";
import Config from "@server/config";
import Logger from "@server/modules/logger";
import Events from "@shared/enums/connection";
import { connect } from "mongoose";
import { getIdentifier, getIdentifiers } from "@server/utils.js";
import DevMode from "@server/systems/devMode.system";
import StepSystem, { IDeferrals } from "@server/systems/steps.system";

let loaded = false;

/**
 * Framework Startup Logic
 * @class Server
 */

class Server {
  static config: IConfig;
  static startTime = new Date();

  static async init() {
    let config: IConfig | any = Config.get();
    if (config.error) {
      return;
    }
    this.config = config;
    Server.Database();
  }
  // make connection with mongodb then log sucess
  static async Database() {
    const { mongoDB } = this.config;

    Logger.info(`Attempting to establish connection with MongoDB: ${mongoDB}`);
    await connect(mongoDB)
      .then((db) => {
        Logger.success(`Successfully connected to MongoDB: ${mongoDB}`);
      })
      .catch((error) => {
        Logger.error(`Unable to connect to mongodb: ${error}`);
        return;
      });
    Server.boot();
  }

  static async boot() {
    await import("./boot.js");
    Logger.info(
      `Framework Initialized in ${
        new Date().getTime() - Server.startTime.getTime()
      }ms`
    );
    emit(Events.ALLOW_CONNECTION);
  }

  static async connection(
    name: string,
    setKickReason: (msg: string) => void,
    deferrals: IDeferrals
  ) {
    const src: any = global.source;
    deferrals.defer();
    const identifier = await getIdentifier(src, "steam");
    if (!identifier)
      return deferrals.done(
        `Couldn't Detect your STEAM Identifier | Please make sure STEAM is running then try again`
      );

    deferrals.update("Connecting...");
    Logger.info(`${name} is Connecting to the Server`);

    if (loaded) {
      if (Config.get().DeveloperMode) {
        DevMode.login(src, deferrals);
        return;
      }

      // StepSystem.login(src, deferrals);
      return;
    } else {
      try {
        deferrals.done("Framework is still booting up, please wait...");
      } catch (error) {
        Logger.error(`Unable to drop player: ${error}`);
      }
    }
  }

  static async frameworkLoaded() {
    loaded = true;
  }
}

on("playerConnecting", Server.connection);
on(Events.ALLOW_CONNECTION, Server.frameworkLoaded);

process.on("uncaughtException", (err) => {
  console.log(err);
});

Server.init();
