import { createStore } from 'zustand/vanilla';
import EntityManager from '../entities/EntityManager';

interface EntityState {
    entityManager: EntityManager;
}

const useEntityStore = createStore<EntityState>()(() => ({
    entityManager: EntityManager.getInstance()
}));

export default useEntityStore;
