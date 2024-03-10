export default class Entity {
    private id_: string;

    private draggable_: boolean = true;
    private hoverable_: boolean = true;
    private selectable_: boolean = true;

    private isSelected_: boolean = false;

    public constructor() {
        this.id_ = '';
    }

    public get id(): string {
        return this.id_;
    }

    public set id(id: string) {
        this.id_ = id;
    }

    public get draggable(): boolean {
        return this.draggable_;
    }

    public set draggable(draggable: boolean) {
        this.draggable_ = draggable;
    }

    public get hoverable(): boolean {
        return this.hoverable_;
    }

    public set hoverable(hoverable: boolean) {
        this.hoverable_ = hoverable;
    }

    public get selectable(): boolean {
        return this.selectable_;
    }

    public set selectable(selectable: boolean) {
        this.selectable_ = selectable;
    }

    public onDragBegin(event: PointerEvent) {}

    public onDrag(event: PointerEvent) {}

    public onDragEnd(event: PointerEvent) {}

    public onEnter(event: PointerEvent) {}

    public onHover(event: PointerEvent) {}

    public onLeave(event: PointerEvent) {}

    public onSelected(event: PointerEvent, selected: boolean) {
        this.isSelected_ = selected;
    }
}
