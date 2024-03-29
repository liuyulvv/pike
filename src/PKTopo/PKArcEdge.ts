import { PKCoordinate, PKCoordinateJSON } from './PKCoordinate';
import { PKEdge, PKEdgeType } from './PKEdge';
import { PKVertex, PKVertexJSON } from './PKVertex';

export interface PKArcEdgeJSON {
    coordinate: PKCoordinateJSON;
    localCenter: PKVertexJSON;
    localSource: PKVertexJSON;
    localTarget: PKVertexJSON;
}

export class PKArcEdge extends PKEdge {
    private localCenter_: PKVertex;
    private localSource_: PKVertex;
    private localTarget_: PKVertex;

    /**
     * @description Create a new PKArcEdge with default values, source, target and center are all (0, 0)
     */
    public constructor() {
        super(PKEdgeType.ARC);
        this.localCenter_ = new PKVertex();
        this.localSource_ = new PKVertex();
        this.localTarget_ = new PKVertex();
    }

    /**
     * @description Create a new PKArcEdge with the given center, source and target, counter-clockwise direction from source to target, and the given coordinate system
     * @param localCenter The center of the arc
     * @param localSource The source vertex of the arc
     * @param localTarget The target vertex of the arc
     * @param coordinate The coordinate system of the arc
     * @returns A new PKArcEdge
     */
    public static fromCenterPoints(localCenter: PKVertex, localSource: PKVertex, localTarget: PKVertex, coordinate: PKCoordinate): PKArcEdge {
        const arc = new PKArcEdge();
        arc.coordinate_ = coordinate;
        arc.localCenter_ = localCenter;
        arc.localSource_ = localSource;
        arc.localTarget_ = localTarget;
        return arc;
    }

    public get source() {
        return this.localSource_.add(this.coordinate_.origin);
    }

    public set source(source: PKVertex) {
        this.localSource_ = source.subtract(this.coordinate_.origin);
    }

    public get target() {
        return this.localTarget_.add(this.coordinate_.origin);
    }

    public set target(target: PKVertex) {
        this.localTarget_ = target.subtract(this.coordinate_.origin);
    }

    public get center() {
        return this.localCenter_.add(this.coordinate_.origin);
    }

    public set center(center: PKVertex) {
        this.localCenter_ = center.subtract(this.coordinate_.origin);
    }

    public get localSource() {
        return this.localSource_;
    }

    public set localSource(source: PKVertex) {
        this.localSource_ = source;
    }

    public get localTarget() {
        return this.localTarget_;
    }

    public set localTarget(target: PKVertex) {
        this.localTarget_ = target;
    }

    public get localCenter() {
        return this.localCenter_;
    }

    public set localCenter(center: PKVertex) {
        this.localCenter_ = center;
    }

    public radius(): number {
        return this.localCenter_.distance(this.localSource_);
    }

    public angle(): number {
        const v1 = this.localSource_.subtract(this.localCenter_);
        const v2 = this.localTarget_.subtract(this.localCenter_);
        return Math.atan2(v2.y * v1.x - v2.x * v1.y, v2.x * v1.x + v2.y * v1.y);
    }

    public degree(): number {
        return (this.angle() * 180) / Math.PI;
    }

    public length(): number {
        return this.radius() * Math.abs(this.angle());
    }

    public clone(): PKArcEdge {
        return new PKArcEdge();
    }

    public toJSON(): PKArcEdgeJSON {
        return {
            coordinate: this.coordinate_.toJSON(),
            localCenter: this.localCenter_.toJSON(),
            localSource: this.localSource_.toJSON(),
            localTarget: this.localTarget_.toJSON()
        };
    }

    public fromJSON(json: PKArcEdgeJSON): void {
        this.coordinate_.fromJSON(json.coordinate);
        this.localCenter_.fromJSON(json.localCenter);
        this.localSource_.fromJSON(json.localSource);
        this.localTarget_.fromJSON(json.localTarget);
    }
}
