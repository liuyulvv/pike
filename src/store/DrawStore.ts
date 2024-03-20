import { createStore } from 'zustand/vanilla';
import useInteractionStore from './InteractionStore';

export enum DrawStateType {
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
        useInteractionStore.getState().activeInteraction.detach();
        switch (state.type) {
            case DrawStateType.LINE:
                useInteractionStore.getState().drawLineInteraction.attach();
                useInteractionStore.setState({ activeInteraction: useInteractionStore.getState().drawLineInteraction });
                break;
            case DrawStateType.ARC:
                useInteractionStore.getState().drawArcInteraction.attach();
                useInteractionStore.setState({ activeInteraction: useInteractionStore.getState().drawArcInteraction });
                break;
            case DrawStateType.RECTANGLE:
                useInteractionStore.getState().drawRectangleInteraction.attach();
                useInteractionStore.setState({ activeInteraction: useInteractionStore.getState().drawRectangleInteraction });
                break;
            case DrawStateType.CIRCLE:
                useInteractionStore.getState().drawCircleInteraction.attach();
                useInteractionStore.setState({ activeInteraction: useInteractionStore.getState().drawCircleInteraction });
                break;
        }
    } else {
        useInteractionStore.getState().activeInteraction.detach();
        useInteractionStore.getState().mainInteraction.attach();
        useInteractionStore.setState({ activeInteraction: useInteractionStore.getState().mainInteraction });
    }
});

export default useDrawStore;
