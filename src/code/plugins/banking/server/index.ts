import Events from "@shared/enums/server";

class Plugin {
  static init() {
    global.exports["Rebirth"].registerPlugin("banking", () => {
      console.log("test");
    });
  }
}
onNet(Events.REGISTER_PLUGINS, Plugin.init);
