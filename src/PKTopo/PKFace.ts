import { PKCoordinate } from './PKCoordinate';
import { PKTopo, PKTopoType } from './PKTopo';

export enum PKFaceType {
    PLANE = 'PLANE',
    CYLINDRICAL = 'CYLINDRICAL',
    SPHERICAL = 'SPHERICAL',
    CONICAL = 'CONICAL'
}

export abstract class PKFace extends PKTopo {
    protected faceType_: PKFaceType;
    protected coordinate_: PKCoordinate;

    constructor(faceType: PKFaceType) {
        super(PKTopoType.FACE);
        this.faceType_ = faceType;
        this.coordinate_ = new PKCoordinate();
    }

    public get faceType() {
        return this.faceType_;
    }

    public getCoordinate() {
        return this.coordinate_;
    }

    public setCoordinate(coordinate: PKCoordinate) {
        this.coordinate_ = coordinate;
    }
}
