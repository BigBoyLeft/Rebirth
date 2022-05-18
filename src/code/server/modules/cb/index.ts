class CB {
    constructor() {
        global.exports("register", this.register);
    }

    register(name: string, callback: Function) {
        let cb = onNet(`Rebirth:client:CB:${name}`, async (data: Object | any) => {
            let src = source
            if (src) {
                callback(data).then((res: any) => {
                    TriggerClientEvent(`Rebirth:client:CB:${name}`, src, res);
                })
            }
        })
        return cb
    }
}

export default new CB();