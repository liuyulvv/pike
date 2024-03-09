import { MeshBuilder as builder, Color4, LinesMesh } from '@babylonjs/core';
import Point from '../geometry/Point';

export default class MeshBuilder {
    private static instance: MeshBuilder;

    private constructor() {}

    public static getInstance() {
        if (!MeshBuilder.instance) {
            MeshBuilder.instance = new MeshBuilder();
        }
        return MeshBuilder.instance;
    }

    public createLine(source: Point, target: Point, color: string | undefined, instance: LinesMesh | undefined) {
        return builder.CreateLines('line', {
            points: [source.toVector3(), target.toVector3()],
            updatable: true,
            instance: instance,
            colors: color ? [Color4.FromHexString(color)] : undefined
        });
    }
}
