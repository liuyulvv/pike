import Point from './Point';

export default class Arc {
    private center_: Point;
    private source_: Point;
    private target_: Point;

    constructor(center: Point, source: Point, target: Point) {
        this.center_ = center;
        this.source_ = source;
        this.target_ = target;
    }

    public get center() {
        return this.center_;
    }

    public set center(center: Point) {
        this.center_ = center;
    }

    public get source() {
        return this.source_;
    }

    public set source(start: Point) {
        this.source_ = start;
    }

    public get target() {
        return this.target_;
    }

    public set target(end: Point) {
        this.target_ = end;
    }
}
