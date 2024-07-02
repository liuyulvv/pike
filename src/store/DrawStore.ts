import { createStore } from 'zustand/vanilla';

enum DrawStateType {
    NONE = 'none',
    LINE = 'line',
    ARC = 'arc',
    RECTANGLE = 'rectangle',
    CIRCLE = 'circle'
}

interface DrawState {
    type: DrawStateType;
}

const useDrawStore = createStore<DrawState>()(() => ({
    type: DrawStateType.NONE
}));

useDrawStore.subscribe((state) => {
    if (state.type != DrawStateType.NONE) {
        switch (state.type) {
            case DrawStateType.LINE:
                break;
            case DrawStateType.ARC:
                break;
            case DrawStateType.RECTANGLE:
                break;
            case DrawStateType.CIRCLE:
                break;
        }
    } else {
    }
});

export { useDrawStore, DrawStateType };
