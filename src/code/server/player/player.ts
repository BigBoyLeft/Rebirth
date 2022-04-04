export class Player {
    cid: string;
    name: string;
    identifiers: any;
    tokens: any;
    data: Object;
    joined: string;

    constructor({ cid, name, identifiers, tokens, data, joined }: { cid: string, name: string, identifiers: string[], tokens: string[], data: Object, joined: string}) {
        this.cid = cid;
        this.name = name;
        this.identifiers = identifiers;
        this.tokens = tokens;
        this.data = data
        this.joined = joined
    }
}