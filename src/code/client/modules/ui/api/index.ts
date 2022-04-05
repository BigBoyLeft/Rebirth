class API {
    private resources: Map<string, any>;

    constructor() {
        // SetNuiFocus(true, true);
        this.resources = new Map<string, any>()
    }

    async registerAPI(resource: string) {
        console.log(`[Rebirth] Registering API: ${resource}`)
        this.resources.set(resource, {})
    }

    async getAPI(resource: string): Promise<any> {
        return this.resources.get(resource)
    }

    async registerUICallback(resource: string, callback: string, callbackFunc: any) {
        console.log(`[Rebirth] Registering UI Callback: ${resource}/${callback}`)
        RegisterNuiCallbackType(`${resource}/${callback}`)
        on(`__cfx_nui:${resource}/${callback}`, async (data: any, cb: any) => {
            callbackFunc(data, cb)
        })
    }
}

export default new API();