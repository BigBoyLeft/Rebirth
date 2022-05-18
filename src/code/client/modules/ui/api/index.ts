const Config = require("@Config");
import { debug } from "@client";
class API {
  private resources: Map<string, any>;

  constructor() {
    // SetNuiFocus(true, true);
    this.resources = new Map<string, any>();
  }

  async registerAPI(resource: string) {
    debug(`[Rebirth] Registering API: ${resource}`);
    this.resources.set(resource, {});
  }

  async getAPI(resource: string): Promise<any> {
    return this.resources.get(resource);
  }

  async registerUICallback(
    resource: string,
    callback: string,
    callbackFunc: any
  ) {
    debug(`[Rebirth] Registering UI Callback: ${resource}/${callback}`);
    RegisterNuiCallbackType(`api/${resource}/${callback}`);
    on(`__cfx_nui:api/${resource}/${callback}`, async (data: any, cb: any) => {
      callbackFunc(data, cb);
    });
  }
}

export default new API();
