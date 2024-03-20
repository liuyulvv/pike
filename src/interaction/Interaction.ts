export default abstract class Interaction {
    public abstract attach(): void;

    public abstract detach(): void;

    protected abstract onPointerDown(event: PointerEvent): void;

    protected abstract onPointerMove(event: PointerEvent): void;

    protected abstract onPointerUp(event: PointerEvent): void;
}
