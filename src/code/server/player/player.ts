class Player {
  cid: string;
  name: string;
  identifiers: any;
  tokens: any;
  data: Object;
  PermissionLevel: number;
  joined: string;

  constructor({
    cid,
    name,
    identifiers,
    tokens,
    data,
    PermissionLevel,
    joined,
  }: {
    cid: string;
    name: string;
    identifiers: string[];
    tokens: string[];
    data: Object;
    PermissionLevel: number;
    joined: string;
  }) {
    this.cid = cid;
    this.name = name;
    this.identifiers = identifiers;
    this.tokens = tokens;
    this.data = data;
    this.PermissionLevel = PermissionLevel;
    this.joined = joined;
  }
}

export default Player;
