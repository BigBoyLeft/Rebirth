var exps = global.exports;

class Hud {
  visible: boolean;
  constructor() {
    this.visible = false;
    this.events();
    this.exports();
    this.commands();
  }

  events() {
    on("Rebirth:Hud:Client:vehicle", function (status: boolean) {
      globalThis.exports["Rebirth"].appAction("hud", { status }, "setVehicle");
    });
    
    on("Rebirth:Hud:Client:status", (visible: boolean) => {
      global.exports["Rebirth"].application("hud", { visible });
      this.visible = visible;
    });
  }

  updateHudValue(key: string, value: number) {
    globalThis.exports["Rebirth"].appAction(
      "hud",
      {
        key,
        value,
      },
      "setValue"
    );
  }

  exports() {
    global.exports("updateHudValue", this.updateHudValue);
  }

  commands() {
    global.exports["Rebirth"].newCommand("hud", "Toggles Hud", () => {
      global.exports["Rebirth"].application("hud", {visible: !this.visible});
      this.visible = !this.visible;
    })
  }
}

export default new Hud();