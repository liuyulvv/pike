export interface PKVectorJSON {
    x: number;
    y: number;
    z: number;
}

export class PKVector {
    protected x_: number;
    protected y_: number;
    protected z_: number;

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

    public add(vector: PKVector): PKVector {
        return new PKVector(this.x_ + vector.x_, this.y_ + vector.y_, this.z_ + vector.z_);
    }

    public subtract(vector: PKVector): PKVector {
        return new PKVector(this.x_ - vector.x_, this.y_ - vector.y_, this.z_ - vector.z_);
    }

    public multiply(scalar: number): PKVector {
        return new PKVector(this.x_ * scalar, this.y_ * scalar, this.z_ * scalar);
    }

    public divide(scalar: number): PKVector {
        return new PKVector(this.x_ / scalar, this.y_ / scalar, this.z_ / scalar);
    }

    public dot(vector: PKVector): number {
        return this.x_ * vector.x_ + this.y_ * vector.y_ + this.z_ * vector.z_;
    }

    public cross(vector: PKVector): PKVector {
        return new PKVector(
            this.y_ * vector.z_ - this.z_ * vector.y_,
            this.z_ * vector.x_ - this.x_ * vector.z_,
            this.x_ * vector.y_ - this.y_ * vector.x_
        );
    }

    public magnitude(): number {
        return Math.sqrt(this.x_ * this.x_ + this.y_ * this.y_ + this.z_ * this.z_);
    }

    public normalize(): PKVector {
        return this.divide(this.magnitude());
    }

    public equal(vector: PKVector): boolean {
        return this.x_ === vector.x_ && this.y_ === vector.y_ && this.z_ === vector.z_;
    }

    public parallel(vector: PKVector, tolerance: number = 1e-6): boolean {
        return this.cross(vector).magnitude() < tolerance;
    }

    public clone(): PKVector {
        return new PKVector(this.x_, this.y_, this.z_);
    }

    public toJSON(): PKVectorJSON {
        return {
            x: this.x_,
            y: this.y_,
            z: this.z_
        };
    }

    public fromJSON(json: PKVectorJSON): void {
        this.x_ = json.x;
        this.y_ = json.y;
        this.z_ = json.z;
    }
}
