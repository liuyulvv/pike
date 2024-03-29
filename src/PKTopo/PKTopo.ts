export enum PKTopoType {
    VERTEX = 'VERTEX',
    EDGE = 'EDGE',
    FACE = 'FACE'
}

export abstract class PKTopo {
    protected type_: PKTopoType;

    constructor(type: PKTopoType) {
        this.type_ = type;
    }

    public get type() {
        return this.type_;
    }

    public abstract clone(): PKTopo;

    public abstract toJSON(): object;

    public abstract fromJSON(json: object): void;
}
