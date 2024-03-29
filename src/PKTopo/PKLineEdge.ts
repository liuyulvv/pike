import { PKCoordinate, PKCoordinateJSON } from './PKCoordinate';
import { PKEdge, PKEdgeType } from './PKEdge';
import { PKVertex, PKVertexJSON } from './PKVertex';

export interface PKLineEdgeJSON {
    coordinate: PKCoordinateJSON;
    localSource: PKVertexJSON;
    localTarget: PKVertexJSON;
}

export class PKLineEdge extends PKEdge {
    private localSource_: PKVertex;
    private localTarget_: PKVertex;

    public constructor() {
        super(PKEdgeType.LINE);
        this.localSource_ = new PKVertex();
        this.localTarget_ = new PKVertex();
    }

    public static fromPoints(localSource: PKVertex, localTarget: PKVertex, coordinate: PKCoordinate): PKLineEdge {
        const edge = new PKLineEdge();
        edge.coordinate_ = coordinate;
        edge.localSource_ = localSource;
        edge.localTarget_ = localTarget;
        return edge;
    }

    public get source() {
        return this.localSource_.add(this.coordinate_.origin);
    }

    public set source(source: PKVertex) {
        this.localSource_ = source.subtract(this.coordinate_.origin);
    }

    public get localSource() {
        return this.localSource_;
    }

    public set localSource(source: PKVertex) {
        this.localSource_ = source;
    }

    public get target() {
        return this.localTarget_.add(this.coordinate_.origin);
    }

    public set target(target: PKVertex) {
        this.localTarget_ = target.subtract(this.coordinate_.origin);
    }

    public get localTarget() {
        return this.localTarget_;
    }

    public set localTarget(target: PKVertex) {
        this.localTarget_ = target;
    }

    public length(): number {
        return Math.sqrt(
            Math.pow(this.target.x - this.source.x, 2) + Math.pow(this.target.y - this.source.y, 2) + Math.pow(this.target.z - this.source.z, 2)
        );
    }

    public clone(): PKLineEdge {
        const edge = new PKLineEdge();
        edge.coordinate_ = this.coordinate_.clone();
        edge.localSource_ = this.localSource_.clone();
        edge.localTarget_ = this.localTarget_.clone();
        return edge;
    }

    public toJSON(): PKLineEdgeJSON {
        return {
            coordinate: this.coordinate_.toJSON(),
            localSource: this.localSource_.toJSON(),
            localTarget: this.localTarget_.toJSON()
        };
    }

    public fromJSON(json: PKLineEdgeJSON): void {
        this.coordinate_.fromJSON(json.coordinate);
        this.localSource_.fromJSON(json.localSource);
        this.localTarget_.fromJSON(json.localTarget);
    }
}
