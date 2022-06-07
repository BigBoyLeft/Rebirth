var focused: boolean = false;

export default class UI {
  private static apps: Map<string, any> = new Map();

  static init() {}

  static setFocus(focus: boolean) {
    focused = focus;
    SetNuiFocus(focus, focus);
  }

  static application(app: string, data: Object | any) {
    if (data.visible === null) data.visible = true;

    SendNUIMessage(
      JSON.stringify({
        type: "application",
        app,
        data,
      })
    );
  }

  static appAction(app: string = "", data: Object | any, action: string = "") {
    if (app === "" || action === "") return;

    console.log(`[Rebirth] App action: ${app}/${action}`);

    SendNUIMessage(
      JSON.stringify({
        type: "action",
        app,
        data: data || {},
        action,
      })
    );
  }

  static registerAPI(resource: string) {
    if (this.apps.has(resource)) return;

    this.apps.set(resource, {});
  }

  static getAPI(resource: string) {
    return this.apps.get(resource);
  }

  static registerUICallback(
    resource: string,
    callback: string,
    callbackFunc: any
  ) {
    RegisterNuiCallbackType(`api/${resource}/${callback}`);
    on(`__cfx_nui:api/${resource}/${callback}`, async (data: any, cb: any) => {
      callbackFunc(data, cb);
    });
  }
}

global.exports("setFocus", UI.setFocus);
global.exports("application", UI.application);
global.exports("appAction", UI.appAction);
global.exports("registerAPI", UI.registerAPI);
global.exports("getAPI", UI.getAPI);
global.exports("registerUICallback", UI.registerUICallback);

UI.init();
