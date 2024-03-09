import { Vector3 } from '@babylonjs/core';

export default class Point {
    private x_: number;
    private y_: number;
    private z_: number;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x_ = x;
        this.y_ = y;
        this.z_ = z;
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

    public toVector3() {
        return new Vector3(this.x_, this.y_, this.z_);
    }

    public static fromVector3(vector: Vector3) {
        return new Point(vector.x, vector.y, vector.z);
    }
}
