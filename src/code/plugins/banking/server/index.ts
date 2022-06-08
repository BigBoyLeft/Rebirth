import Events from "@shared/enums/server";
import Banking from "@plugins/banking/server/banking";

class Plugin {
  static init() {
    global.exports["Rebirth"].registerPlugin("banking", () => {
      Banking.init();
    });
  }
}
onNet(Events.REGISTER_PLUGINS, Plugin.init);
