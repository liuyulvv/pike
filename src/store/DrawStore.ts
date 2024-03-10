import { createStore } from 'zustand/vanilla';

export enum DrawStateType {
    NONE = 'none',
    LINE = 'line',
    ARC = 'arc',
    RECTANGLE = 'rectangle',
    CIRCLE = 'circle'
}

interface DrawState {
    draw: boolean;
    type: DrawStateType;
}

const useDrawStore = createStore<DrawState>()(() => ({
    draw: false,
    type: DrawStateType.NONE
}));

export default useDrawStore;
