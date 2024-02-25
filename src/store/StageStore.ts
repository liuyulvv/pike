import { createStore } from 'zustand/vanilla';
import Stage from '../3D/Stage';

interface StageState {
    stage: Stage | undefined;
}

const useStageStore = createStore<StageState>()(() => ({
    stage: undefined
}));

export default useStageStore;
