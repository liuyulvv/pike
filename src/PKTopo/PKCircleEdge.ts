import { PKCoordinate, PKCoordinateJSON } from './PKCoordinate';
import { PKEdge, PKEdgeType } from './PKEdge';
import { PKTopo } from './PKTopo';
import { PKVertex, PKVertexJSON } from './PKVertex';

export interface PKCircleEdgeJSON {
    coordinate: PKCoordinateJSON;
    localCenter: PKVertexJSON;
    radius: number;
}

export class PKCircleEdge extends PKEdge {
    private localCenter_: PKVertex;
    private radius_: number;

    /**
     * @description Create a new PKCircleEdge with default values, center is (0, 0) and radius is 0, coordinate system is the default
     */
    public constructor() {
        super(PKEdgeType.CIRCLE);
        this.localCenter_ = new PKVertex();
        this.radius_ = 0;
    }

    /**
     * @description Create a new PKCircleEdge with the given center and radius
     * @param localCenter The center of the circle
     * @param radius The radius of the circle
     * @param coordinate The coordinate system of the circle
     * @returns A new PKCircleEdge
     */
    public static fromCenterRadius(localCenter: PKVertex, radius: number, coordinate: PKCoordinate): PKCircleEdge {
        const circle = new PKCircleEdge();
        circle.coordinate_ = coordinate;
        circle.localCenter_ = localCenter;
        circle.radius_ = radius;
        return circle;
    }

    public get center(): PKVertex {
        return this.localCenter_.add(this.coordinate_.origin);
    }

    public set center(center: PKVertex) {
        this.localCenter_ = center.subtract(this.coordinate_.origin);
    }

    public get localCenter(): PKVertex {
        return this.localCenter_;
    }

    public set localCenter(localCenter: PKVertex) {
        this.localCenter_ = localCenter;
    }

    public get radius(): number {
        return this.radius_;
    }

    public set radius(radius: number) {
        this.radius_ = radius;
    }

    public length(): number {
        return 2 * Math.PI * this.radius;
    }

    public clone(): PKTopo {
        const circle = new PKCircleEdge();
        circle.coordinate_ = this.coordinate_.clone();
        circle.localCenter_ = this.localCenter_.clone();
        circle.radius_ = this.radius_;
        return circle;
    }

    public toJSON(): PKCircleEdgeJSON {
        return {
            coordinate: this.coordinate_.toJSON(),
            localCenter: this.localCenter_.toJSON(),
            radius: this.radius_
        };
    }

    public fromJSON(json: PKCircleEdgeJSON): void {
        this.coordinate_.fromJSON(json.coordinate);
        this.localCenter_.fromJSON(json.localCenter);
        this.radius_ = json.radius;
    }
}
