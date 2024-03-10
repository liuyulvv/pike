import { MeshBuilder } from '@babylonjs/core';
import { createStore } from 'zustand/vanilla';
import Stage from '../3D/Stage';

interface StageState {
    stage: Stage | undefined;
    canvas: HTMLCanvasElement | undefined;
    meshBuilder: typeof MeshBuilder;
}

const useStageStore = createStore<StageState>()(() => ({
    stage: undefined,
    canvas: undefined,
    meshBuilder: MeshBuilder
}));

export default useStageStore;
