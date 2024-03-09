import { createStore } from 'zustand/vanilla';

export enum DrawType {
    NONE = 'none',
    LINE = 'line',
    ARC = 'arc',
    RECTANGLE = 'rectangle',
    CIRCLE = 'circle'
}

interface DrawState {
    draw: boolean;
    type: DrawType;
}

const useDrawStore = createStore<DrawState>()(() => ({
    draw: false,
    type: DrawType.NONE
}));

export default useDrawStore;
