import API from "./api";
var exps = global.exports;

// function application(app: string, data: Object | any) {
//   if (!data.visible) data.visible = true;
//   SetNuiFocus(data.visible, data.visible);
//   SendNUIMessage(
//     JSON.stringify({
//       type: "application",
//       app,
//       data,
//     })
//   );
// }
// exps("application", application);

// function appAction(app: string, data: Object | any, action: string) {
//   SendNUIMessage(
//     JSON.stringify({
//       type: "action",
//       app,
//       data: data || {},
//       action,
//     })
//   );
// }
// exps("appAction", appAction);

class UI {
  uiFocus: boolean;
  currentApp: string;

  constructor() {
    this.uiFocus = false;
    this.currentApp = "";
    this.init();
    global.exports("setFocus", this.setFocus);
    global.exports("application", this.application);
    global.exports("appAction", this.appAction);
  }

  init() {
    API.registerAPI("ui");
    API.registerUICallback("ui", "focus", async (data: any, cb: any) => {
      this.setFocus(data.focus);
      cb(true);
    });
  }

  setFocus(focus: boolean) {
    this.uiFocus = focus;
    SetNuiFocus(focus, focus);
  }

  application(app: string, data: Object | any) {
    if (data.visible === null) data.visible = true;
    SendNUIMessage(
      JSON.stringify({
        type: "application",
        app,
        data,
      })
    );
  }

  appAction(app: string = "", data: Object | any, action: string = "") {
    if (data.app === "" || data.app === "") return;
    SendNUIMessage(
      JSON.stringify({
        type: "action",
        app,
        data: data || {},
        action,
      })
    );
  }
}

export default new UI();