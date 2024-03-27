import { Vector2 } from '@babylonjs/core';
import useDrawStore, { DrawStateType } from '../store/DrawStore';
import useStageStore from '../store/StageStore';
import Interaction from './Interaction';

export default class DrawCircleInteraction extends Interaction {
    private static instance_: DrawCircleInteraction;

    private onPointerDownBind_ = this.onPointerDown.bind(this);
    private onPointerMoveBind_ = this.onPointerMove.bind(this);
    private onPointerUpBind_ = this.onPointerUp.bind(this);

    private rightPointerDownPosition_: Vector2;

    private constructor() {
        super();
        this.rightPointerDownPosition_ = new Vector2(0, 0);
    }

    public static getInstance(): DrawCircleInteraction {
        if (!DrawCircleInteraction.instance_) {
            DrawCircleInteraction.instance_ = new DrawCircleInteraction();
        }
        return DrawCircleInteraction.instance_;
    }

    public attach(): void {
        const canvas = useStageStore.getState().canvas;
        if (canvas) {
            canvas.addEventListener('pointerdown', this.onPointerDownBind_);
            canvas.addEventListener('pointermove', this.onPointerMoveBind_);
            canvas.addEventListener('pointerup', this.onPointerUpBind_);
        }
    }

    public detach(): void {
        const canvas = useStageStore.getState().canvas;
        if (canvas) {
            canvas.removeEventListener('pointerdown', this.onPointerDownBind_);
            canvas.removeEventListener('pointermove', this.onPointerMoveBind_);
            canvas.removeEventListener('pointerup', this.onPointerUpBind_);
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
