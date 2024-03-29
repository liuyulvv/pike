import { PKVector } from '../PKMath/PKVector';
import { PKTopo, PKTopoType } from './PKTopo';

export interface PKVertexJSON {
    x: number;
    y: number;
    z: number;
}

export class PKVertex extends PKTopo {
    private x_: number;
    private y_: number;
    private z_: number;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        super(PKTopoType.VERTEX);
        this.x_ = x;
        this.y_ = y;
        this.z_ = z;
    }

    public static fromVector(vector: PKVector): PKVertex {
        return new PKVertex(vector.x, vector.y, vector.z);
    }

    public get x() {
        return this.x_;
    }

    public set x(x: number) {
        this.x_ = x;
    }

    public get y() {
        return this.y_;
    }

    public set y(y: number) {
        this.y_ = y;
    }

    public get z() {
        return this.z_;
    }

    public set z(z: number) {
        this.z_ = z;
    }

    public add(vertex: PKVertex | PKVector): PKVertex {
        const newVertex = new PKVertex(this.x_ + vertex.x, this.y_ + vertex.y, this.z_ + vertex.z);
        return newVertex;
    }

    public subtract(vertex: PKVertex | PKVector): PKVertex {
        const newVertex = new PKVertex(this.x_ - vertex.x, this.y_ - vertex.y, this.z_ - vertex.z);
        return newVertex;
    }

    public multiply(scalar: number): PKVertex {
        const newVertex = new PKVertex(this.x_ * scalar, this.y_ * scalar, this.z_ * scalar);
        return newVertex;
    }

    public divide(scalar: number): PKVertex {
        const newVertex = new PKVertex(this.x_ / scalar, this.y_ / scalar, this.z_ / scalar);
        return newVertex;
    }

    public distance(vertex: PKVertex | PKVector): number {
        return Math.sqrt(Math.pow(this.x_ - vertex.x, 2) + Math.pow(this.y_ - vertex.y, 2) + Math.pow(this.z_ - vertex.z, 2));
    }

    public equal(vertex: PKVertex | PKVector, tolerance: number = 1e-6): boolean {
        return this.distance(vertex) < tolerance;
    }

    public clone() {
        return new PKVertex(this.x_, this.y_, this.z_);
    }

    public toJSON(): PKVertexJSON {
        return {
            x: this.x_,
            y: this.y_,
            z: this.z_
        };
    }

    public fromJSON(json: PKVertexJSON): void {
        this.x_ = json.x;
        this.y_ = json.y;
        this.z_ = json.z;
    }
}
