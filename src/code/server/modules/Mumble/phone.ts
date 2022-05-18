class PhoneModule {
    public activeCalls: Map<number, any> ;
    constructor() {
        this.activeCalls = new Map();
    }
}

export default new PhoneModule();