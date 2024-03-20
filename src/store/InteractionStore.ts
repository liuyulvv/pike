import { createStore } from 'zustand/vanilla';
import DrawArcInteraction from '../interaction/DrawArcInteraction';
import DrawCircleInteraction from '../interaction/DrawCircleInteraction';
import DrawLineInteraction from '../interaction/DrawLineInteraction';
import DrawRectangleInteraction from '../interaction/DrawRectangleInteraction';
import Interaction from '../interaction/Interaction';
import MainInteraction from '../interaction/MainInteraction';

interface InteractionState {
    activeInteraction: Interaction;
    mainInteraction: MainInteraction;
    drawLineInteraction: DrawLineInteraction;
    drawArcInteraction: DrawArcInteraction;
    drawRectangleInteraction: DrawRectangleInteraction;
    drawCircleInteraction: DrawCircleInteraction;
}

const useInteractionStore = createStore<InteractionState>()(() => ({
    activeInteraction: MainInteraction.getInstance(),
    mainInteraction: MainInteraction.getInstance(),
    drawLineInteraction: DrawLineInteraction.getInstance(),
    drawArcInteraction: DrawArcInteraction.getInstance(),
    drawRectangleInteraction: DrawRectangleInteraction.getInstance(),
    drawCircleInteraction: DrawCircleInteraction.getInstance()
}));

export default useInteractionStore;
