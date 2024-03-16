import { ArcRotateCamera, ArcRotateCameraPointersInput, Camera, IPointerEvent, Nullable, PointerTouch, Scene, Vector3 } from '@babylonjs/core';
import useStageStore from '../store/StageStore';

export default class CameraTop {
    private static instance_: CameraTop;

    private camera_: ArcRotateCamera | undefined;
    private oldRadius_: number = 0;

    private constructor() {}

    public static getInstance() {
        if (!CameraTop.instance_) {
            CameraTop.instance_ = new CameraTop();
        }
        return CameraTop.instance_;
    }

    public init(scene: Scene) {
        this.camera_ = new ArcRotateCamera('camera', Math.PI / 2, 0, 10, Vector3.Zero(), scene);
        this.camera_.lowerBetaLimit = 0;
        this.camera_.upperBetaLimit = 0;
        this.camera_.lowerAlphaLimit = Math.PI / 2;
        this.camera_.upperAlphaLimit = Math.PI / 2;
        this.camera_.mode = Camera.ORTHOGRAPHIC_CAMERA;
        this.camera_.orthoLeft = -10;
        this.camera_.orthoRight = 10;
        this.camera_.lowerRadiusLimit = 0;
        this.camera_.upVector = new Vector3(0, 0, 1);
        this.oldRadius_ = this.camera_.radius;
        this.camera_.inertia = 0;
        this.camera_.wheelPrecision = 1;
        this.camera_.panningInertia = 0;
        this.camera_.panningSensibility = 100;
        this.camera_.inputs.clear();
        this.camera_.inputs.addMouseWheel();
        this.camera_.inputs.add(new Camera2DPointersInput());
        const canvas = scene.getEngine().getRenderingCanvas();
        if (canvas) {
            this.setCameraOrtho(canvas.height / canvas.width);
        }
        scene.onBeforeRenderObservable.add(() => {
            const position = this.camera_?.position;
            if (position && this.camera_) {
                this.camera_.panningSensibility = 1000 / position.z;
            }
            const canvas = scene.getEngine().getRenderingCanvas();
            if (canvas && this.camera_ && this.oldRadius_ != this.camera_.radius) {
                const change = this.camera_.radius / this.oldRadius_;
                this.camera_.orthoLeft! *= change;
                this.camera_.orthoRight! *= change;
                this.oldRadius_ = this.camera_.radius;
                this.setCameraOrtho(canvas.height / canvas.width);
            }
        });
    }

    public attach(canvas: HTMLCanvasElement, scene: Scene) {
        if (this.camera_) {
            this.camera_.attachControl(canvas, true);
            scene.activeCamera = this.camera_;
        }
    }

    public detach() {
        if (this.camera_) {
            this.camera_.detachControl();
        }
    }

    public dispose() {
        this.camera_?.dispose();
    }

    public setCameraOrtho(ratio: number) {
        if (this.camera_) {
            this.camera_.orthoTop = this.camera_.orthoRight! * ratio;
            this.camera_.orthoBottom = this.camera_.orthoLeft! * ratio;
        }
    }
}

class Camera2DPointersInput extends ArcRotateCameraPointersInput {
    private stage_ = useStageStore.getState().stage;
    private picked_: boolean = false;

    public constructor() {
        super();
    }

    onButtonDown(evt: IPointerEvent): void {
        if (evt.button == 0) {
            const pickInfo = this.stage_?.pick();
            this.picked_ = pickInfo?.hit ?? false;
        }
    }

    onTouch(_point: Nullable<PointerTouch>, offsetX: number, offsetY: number): void {
        if (this._ctrlKey || this._shiftKey || this._altKey || this._metaKey) {
            return;
        }
        if (this.picked_) {
            if (this._buttonsPressed == 2) {
                this.camera.inertialPanningX += -offsetX / this.panningSensibility;
                this.camera.inertialPanningY += offsetY / this.panningSensibility;
            }
        } else {
            if (this._buttonsPressed == 1 || this._buttonsPressed == 2) {
                this.camera.inertialPanningX += -offsetX / this.panningSensibility;
                this.camera.inertialPanningY += offsetY / this.panningSensibility;
            }
        }
    }

    onButtonUp(evt: IPointerEvent): void {
        if (evt.button == 0) {
            this.picked_ = false;
        }
    }
}
