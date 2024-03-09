import Point from './Point';

export default class Circle {
    private center_: Point;
    private radius_: number;

    constructor(center: Point, radius: number) {
        this.center_ = center;
        this.radius_ = radius;
    }

    public get center() {
        return this.center_;
    }

    public set center(center: Point) {
        this.center_ = center;
    }

    public get radius() {
        return this.radius_;
    }

    public set radius(radius: number) {
        this.radius_ = radius;
    }
}
