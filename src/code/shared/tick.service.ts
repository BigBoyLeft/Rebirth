export type Handler = () => void;

export default class TickService {
    constructor() {
        setTick(() => {
            this.ticks.forEach((handler: Handler) => handler());
        })
    }
    count: number = 0
    ticks: any = new Map<number, Handler>();

    set = (handler: Handler) => {
        const id = this.count;

        this.ticks.set(id, handler);
        this.count++;
        return id
    };

    remove = (id: number) => {
        if (!this.ticks.has(id)) return;
        this.ticks.delete(id);
        
        return true
    };

    update = (id: number, handler: Handler) => {
        if (!this.ticks.has(id)) return;

        this.ticks.set(id, handler);
        return true
    }
}