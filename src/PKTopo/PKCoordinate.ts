import { PKVector, PKVectorJSON } from '../PKMath/PKVector';

export interface PKCoordinateJSON {
    origin: PKVectorJSON;
    xDirection: PKVectorJSON;
    yDirection: PKVectorJSON;
    zDirection: PKVectorJSON;
    normal: PKVectorJSON;
}

export class PKCoordinate {
    private origin_: PKVector;
    private xDirection_: PKVector;
    private yDirection_: PKVector;
    private zDirection_: PKVector;

    /**
     * @description Creates a new PKCoordinate, with the origin at (0, 0, 0) and the x, y, and z directions as the standard basis vectors.
     */
    constructor() {
        this.origin_ = new PKVector();
        this.xDirection_ = new PKVector(1, 0, 0);
        this.yDirection_ = new PKVector(0, 1, 0);
        this.zDirection_ = new PKVector(0, 0, 1);
    }

    /**
     * @description Creates a new PKCoordinate from an origin and x and y directions.
     * @param origin
     * @param xDirection
     * @param yDirection
     * @returns
     */
    public static fromOriginAndXYDirection(origin: PKVector, xDirection: PKVector, yDirection: PKVector): PKCoordinate {
        const placement = new PKCoordinate();
        placement.origin = origin;
        placement.xDirection_ = xDirection;
        placement.yDirection_ = yDirection;
        placement.zDirection_ = xDirection.cross(yDirection);
        return placement;
    }

    public get origin(): PKVector {
        return this.origin_;
    }

    public set origin(origin: PKVector) {
        this.origin_ = origin;
    }

    public get normal(): PKVector {
        return this.zDirection_;
    }

    public get xDirection(): PKVector {
        return this.xDirection_;
    }

    public get yDirection(): PKVector {
        return this.yDirection_;
    }

    public get zDirection(): PKVector {
        return this.zDirection_;
    }

    public equal(coordinate: PKCoordinate): boolean {
        return (
            this.origin_.equal(coordinate.origin) &&
            this.xDirection_.parallel(coordinate.xDirection) &&
            this.yDirection_.parallel(coordinate.yDirection) &&
            this.zDirection_.parallel(coordinate.zDirection)
        );
    }

    public clone(): PKCoordinate {
        const clone = new PKCoordinate();
        clone.origin = this.origin_.clone();
        clone.xDirection_ = this.xDirection_.clone();
        clone.yDirection_ = this.yDirection_.clone();
        clone.zDirection_ = this.zDirection_.clone();
        return clone;
    }

    public toJSON(): PKCoordinateJSON {
        return {
            origin: this.origin.toJSON(),
            xDirection: this.xDirection.toJSON(),
            yDirection: this.yDirection.toJSON(),
            zDirection: this.zDirection.toJSON(),
            normal: this.normal.toJSON()
        };
    }

    public fromJSON(json: PKCoordinateJSON): void {
        this.origin.fromJSON(json.origin);
        this.xDirection.fromJSON(json.xDirection);
        this.yDirection.fromJSON(json.yDirection);
        this.zDirection.fromJSON(json.zDirection);
    }
}
