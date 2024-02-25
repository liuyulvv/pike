import { AxesViewer, Color3, Color4, Engine, Matrix, Mesh, MeshBuilder, Scene, Vector2, Vector3 } from '@babylonjs/core';
import { GridMaterial } from '@babylonjs/materials';
import CameraTop from './Camera';

export default class Stage {
    private static instance_: Stage;

    private canvas_: HTMLCanvasElement | undefined;
    private engine_: Engine | undefined;
    private scene_: Scene | undefined;
    private camera_: CameraTop | undefined;
    private ground_: Mesh | undefined;

    private constructor() {}

    public static getInstance() {
        if (!Stage.instance_) {
            Stage.instance_ = new Stage();
        }
        return Stage.instance_;
    }

    public init() {
        this.canvas_ = document.getElementById('main_canvas') as HTMLCanvasElement;
        this.engine_ = new Engine(this.canvas_);
        this.scene_ = new Scene(this.engine_);
        this.scene_.clearColor = new Color4(1, 1, 1, 1);
        this.camera_ = CameraTop.getInstance();
        this.camera_.init(this.scene_);
        this.camera_.attach(this.canvas_, this.scene_);
        this.ground_ = MeshBuilder.CreateGround('ground', { width: 100, height: 100 }, this.scene_);
        const ground_material = new GridMaterial('ground_material', this.scene_);
        ground_material.opacity = 0.5;
        ground_material.useMaxLine = true;
        ground_material.zOffset = 1;
        ground_material.zOffsetUnits = 10;
        this.ground_.material = ground_material;

        new AxesViewer(this.scene_);
        const helper = this.scene_.createDefaultEnvironment({
            environmentTexture: '/assets/env/environmentSpecular.env',
            createGround: false,
            createSkybox: false
        });
        helper?.setMainColor(new Color3(1, 1, 1));

        this.engine_.runRenderLoop(() => {
            this.scene_?.render();
        });
    }

    public dispose() {
        this.scene_?.dispose();
        this.engine_?.dispose();
        this.camera_?.dispose();
    }

    public resize() {
        if (this.engine_) {
            this.engine_.resize();
            this.camera_?.setCameraOrtho(this.canvas_!.height / this.canvas_!.width);
        }
    }

    public screenPositionToWorld(position: Vector2): Vector3 {
        const world = Vector3.Unproject(
            new Vector3(position.x, position.y, 0),
            this.canvas_!.width,
            this.canvas_!.height,
            Matrix.Identity(),
            this.scene_!.getViewMatrix(),
            this.scene_!.getProjectionMatrix()
        );
        world.y = 0;
        return world;
    }
}
