class API {
    private resources: Map<string, any>;

    constructor() {
        // SetNuiFocus(true, true);
        this.resources = new Map<string, any>()
        this.registerAPI('character');
        this.registerUICallback('character', 'delete', function(data: any, cb: any) {
            console.log(data)
            cb({
                ssn: data.ssn,
            })
        })
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
            console.log(data)
            cb('test')
        })
    }
}

export default new API();