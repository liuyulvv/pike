import { createStore } from 'zustand/vanilla';
import Interaction from '../3D/Interaction';

interface InteractionState {
    interaction: Interaction;
}

const useInteractionStore = createStore<InteractionState>()(() => ({
    interaction: Interaction.getInstance()
}));

export default useInteractionStore;
