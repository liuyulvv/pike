import { MeshBuilder as builder, Color4, LinesMesh, Vector3 } from '@babylonjs/core';
import { PKVertex } from '../PKTopo/PKVertex';

export default class MeshBuilder {
    private static instance_: MeshBuilder;

    private constructor() {}

    public static getInstance() {
        if (!MeshBuilder.instance_) {
            MeshBuilder.instance_ = new MeshBuilder();
        }
        return MeshBuilder.instance_;
    }

    public createLine(source: PKVertex, target: PKVertex, color: string | undefined, instance: LinesMesh | undefined) {
        return builder.CreateLines('line', {
            points: [new Vector3(source.x, source.y, source.z), new Vector3(target.x, target.y, target.z)],
            updatable: true,
            instance: instance,
            colors: color ? [Color4.FromHexString(color)] : undefined
        });
    }
}
