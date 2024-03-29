import { PKVertex } from '../PKTopo/PKVertex';

export default class Capture {
    private vertex_: PKVertex[];

    constructor() {
        this.vertex_ = [];
    }

    public addVertex(point: PKVertex) {
        for (let i = 0; i < this.vertex_.length; i++) {
            if (point.equal(this.vertex_[i])) {
                return;
            }
        }
        this.vertex_.push(point);
    }
}
