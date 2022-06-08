import Events from "@shared/enums/server";

const plugins: string[] = [];

export default class PluginSystem {
  static initilized: boolean = false;

  static init() {
    PluginSystem.initilized = true;
  }

  static register(name: string, callback: Function) {
    plugins.push(name);
    if (!PluginSystem.initilized) {
      let interval = setInterval(() => {
        if (PluginSystem.initilized) {
          clearInterval(interval);
          callback();
        }
      }, 1000);
    } else {
      callback();
    }
  }

  static getPlugins(): Array<string> {
    return plugins;
  }
}

PluginSystem.init();

global.exports("registerPlugin", PluginSystem.register);
emit(Events.REGISTER_PLUGINS);

"I hope you all fall down the stairs"