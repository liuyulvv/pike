import { Vector2 } from '@babylonjs/core';
import PickInfo from '../interface/PickInfo';
import useEntityStore from '../store/EntityStore';
import useStageStore from '../store/StageStore';

export default class Interaction {
    private static instance_: Interaction;

    private entityManager_ = useEntityStore.getState().entityManager;

    private onPointerDownBind = this.onPointerDown.bind(this);
    private onPointerMoveBind = this.onPointerMove.bind(this);
    private onPointerUpBind = this.onPointerUp.bind(this);

    private pointerDownPosition_: Vector2;

    private pointerDownPickInfo_: PickInfo;
    private pointerMovePickInfo_: PickInfo;

    private dragging_: boolean;

    private constructor() {
        this.pointerDownPosition_ = new Vector2(0, 0);
        this.pointerDownPickInfo_ = {
            hit: false,
            meshID: ''
        };
        this.pointerMovePickInfo_ = {
            hit: false,
            meshID: ''
        };
        this.dragging_ = false;
    }

    public static getInstance(): Interaction {
        if (!Interaction.instance_) {
            Interaction.instance_ = new Interaction();
        }
        return Interaction.instance_;
    }

    public attach() {
        const canvas = useStageStore.getState().canvas;
        if (canvas) {
            canvas.addEventListener('pointerdown', this.onPointerDownBind);
            canvas.addEventListener('pointermove', this.onPointerMoveBind);
            canvas.addEventListener('pointerup', this.onPointerUpBind);
        }
    }

    public detach() {
        const canvas = useStageStore.getState().canvas;
        if (canvas) {
            canvas.removeEventListener('pointerdown', this.onPointerDownBind);
            canvas.removeEventListener('pointermove', this.onPointerMoveBind);
            canvas.removeEventListener('pointerup', this.onPointerUpBind);
        }
    }

    private pick() {
        const stage = useStageStore.getState().stage;
        let pickInfo: PickInfo = {
            hit: false,
            meshID: ''
        };
        if (stage) {
            pickInfo = stage.pick();
        }
        return pickInfo;
    }

    private onPointerDown(event: PointerEvent) {
        this.pointerDownPosition_.x = event.clientX;
        this.pointerDownPosition_.y = event.clientY;
        if (event.buttons == 1) {
            this.pointerDownPickInfo_ = this.pick();
        }
    }

    private onPointerMove(event: PointerEvent) {
        if (event.buttons == 1 && this.pointerDownPickInfo_.hit) {
            const entity = this.entityManager_.getEntity(this.pointerDownPickInfo_.meshID);
            if (entity && entity.draggable) {
                if (!this.dragging_) {
                    this.dragging_ = true;
                    entity.onDragBegin(event);
                } else {
                    entity.onDrag(event);
                }
            }
        } else {
            const pointerMovePickInfo = this.pick();
            if (pointerMovePickInfo.hit) {
                const entity = this.entityManager_.getEntity(pointerMovePickInfo.meshID);
                if (pointerMovePickInfo.meshID == this.pointerMovePickInfo_.meshID) {
                    if (entity && entity.hoverable) {
                        entity.onHover(event);
                    }
                } else {
                    const lastEntity = this.entityManager_.getEntity(this.pointerMovePickInfo_.meshID);
                    if (lastEntity && lastEntity.hoverable) {
                        lastEntity.onLeave(event);
                    }
                    if (entity && entity.hoverable) {
                        entity.onEnter(event);
                    }
                    this.pointerMovePickInfo_ = pointerMovePickInfo;
                }
            }
        }
    }

    private onPointerUp(event: PointerEvent) {
        if (this.dragging_) {
            const entity = this.entityManager_.getEntity(this.pointerDownPickInfo_.meshID);
            if (entity && entity.draggable) {
                entity.onDragEnd(event);
            }
            this.dragging_ = false;
        } else {
            const pointerUpPickInfo = this.pick();
            const entity = this.entityManager_.getEntity(this.pointerDownPickInfo_.meshID);
            if (pointerUpPickInfo.hit) {
                if (pointerUpPickInfo.meshID == this.pointerDownPickInfo_.meshID) {
                    if (entity && entity.selectable) {
                        entity.onSelected(event, true);
                    }
                } else {
                    if (entity && entity.selectable) {
                        entity.onSelected(event, false);
                    }
                    const lastEntity = this.entityManager_.getEntity(pointerUpPickInfo.meshID);
                    if (lastEntity && lastEntity.selectable) {
                        lastEntity.onSelected(event, true);
                    }
                }
            }
        }
    }
}
