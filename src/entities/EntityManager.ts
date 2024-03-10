import useStageStore from '../store/StageStore';
import Entity from './Entity';

export default class EntityManager {
    private static instance_: EntityManager;

    private entities_: Map<string, Entity> = new Map<string, Entity>();

    private builder_ = useStageStore.getState().meshBuilder;

    private constructor() {}

    public static getInstance() {
        if (!EntityManager.instance_) {
            EntityManager.instance_ = new EntityManager();
        }
        return EntityManager.instance_;
    }

    public addEntity(entity: Entity) {
        this.entities_.set(entity.id, entity);
    }

    public removeEntity(entity: Entity) {
        this.entities_.delete(entity.id);
    }

    public getEntity(id: string) {
        return this.entities_.get(id);
    }

    public test() {
        const mesh = EntityManager.instance_.builder_.CreateBox('box', { size: 2 });
        const entity = new Entity();
        entity.id = mesh.id;
        this.addEntity(entity);
    }
}
