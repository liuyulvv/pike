import { Vector2 } from '@babylonjs/core';
import useDrawStore, { DrawStateType } from '../store/DrawStore';
import useStageStore from '../store/StageStore';
import Interaction from './Interaction';

export default class DrawRectangleInteraction extends Interaction {
    private static instance_: DrawRectangleInteraction;

    private onPointerDownBind = this.onPointerDown.bind(this);
    private onPointerMoveBind = this.onPointerMove.bind(this);
    private onPointerUpBind = this.onPointerUp.bind(this);

    private rightPointerDownPosition_: Vector2;

    private constructor() {
        super();
        this.rightPointerDownPosition_ = new Vector2(0, 0);
    }

    public static getInstance(): DrawRectangleInteraction {
        if (!DrawRectangleInteraction.instance_) {
            DrawRectangleInteraction.instance_ = new DrawRectangleInteraction();
        }
        return DrawRectangleInteraction.instance_;
    }

    public attach(): void {
        const canvas = useStageStore.getState().canvas;
        if (canvas) {
            canvas.addEventListener('pointerdown', this.onPointerDownBind);
            canvas.addEventListener('pointermove', this.onPointerMoveBind);
            canvas.addEventListener('pointerup', this.onPointerUpBind);
        }
    }

    public detach(): void {
        const canvas = useStageStore.getState().canvas;
        if (canvas) {
            canvas.removeEventListener('pointerdown', this.onPointerDownBind);
            canvas.removeEventListener('pointermove', this.onPointerMoveBind);
            canvas.removeEventListener('pointerup', this.onPointerUpBind);
        }
    }

    protected onPointerDown(event: PointerEvent): void {
        if (event.button == 2) {
            this.rightPointerDownPosition_.x = event.clientX;
            this.rightPointerDownPosition_.y = event.clientY;
        }
    }

    protected onPointerMove(event: PointerEvent): void {}

    protected onPointerUp(event: PointerEvent): void {
        if (event.button == 2) {
            const dx = event.clientX - this.rightPointerDownPosition_.x;
            const dy = event.clientY - this.rightPointerDownPosition_.y;
            if (dx == 0 && dy == 0) {
                useDrawStore.setState({ type: DrawStateType.NONE });
            }
        }
    }
}
