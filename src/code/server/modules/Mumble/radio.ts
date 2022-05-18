class RadioModule {
    public activeFrequencies: Map<number, any> ;
    constructor() {
        this.activeFrequencies = new Map();
    }

    public async joinRadio(source: number, frequency: number) {
        if (this.activeFrequencies.get(source)) return;
        this.activeFrequencies.set(source, frequency);
        return
    }

    public async leaveRadio(source: number) {
        if (!this.activeFrequencies.get(source)) return;
        this.activeFrequencies.delete(source);
        return
    }
}

export default new RadioModule();