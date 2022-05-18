class CB {
    constructor() {
        global.exports("execute", this.execute);
    }

    execute(name: string, data: Object | any): Promise<any> {
        return new Promise((resolve, reject) => {
            let state = "pending";
            let timeout = null
            // let id = Math.floor(Math.random() * 1000000)
            onNet(`Rebirth:client:CB:${name}`, (data: Object | any) => {
                if (state === "pending") {
                    state = "resolved";
                    resolve(data);
                } else if (state === "resolved") {
                    console.warn(`CB:${name} | called multiple times but already resolved`);
                }
                removeEventListener(`Rebirth:client:CB:${name}`, () => {});
            })
            TriggerServerEvent(`Rebirth:client:CB:${name}`, data);
            timeout = setTimeout(() => {
                if (state === "pending") {
                    state = "rejected";
                    reject({error: true, message: "timeout"});
                }
            }, 10000)
        });
    }
}

export default new CB();