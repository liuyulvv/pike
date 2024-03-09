import Point from './Point';

export default class Segment {
    private source_: Point;
    private target_: Point;

    constructor(source: Point, target: Point) {
        this.source_ = source;
        this.target_ = target;
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
