import { PKCoordinate } from './PKCoordinate';
import { PKTopo, PKTopoType } from './PKTopo';

export enum PKEdgeType {
    LINE = 'LINE',
    ARC = 'ARC',
    CIRCLE = 'CIRCLE'
}

export abstract class PKEdge extends PKTopo {
    protected edgeType_: PKEdgeType;
    protected coordinate_: PKCoordinate;

    constructor(edgeType: PKEdgeType) {
        super(PKTopoType.EDGE);
        this.edgeType_ = edgeType;
        this.coordinate_ = new PKCoordinate();
    }

    public get edgeType() {
        return this.edgeType_;
    }

    public getCoordinate() {
        return this.coordinate_;
    }

    public setCoordinate(coordinate: PKCoordinate) {
        this.coordinate_ = coordinate;
    }

    public abstract length(): number;
}
