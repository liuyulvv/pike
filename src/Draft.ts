import { DraftApp } from 'draft';

export class Draft {
    private static instance: Draft;

    private drawIntervalId: number | null = null;
    private fps: number = 60;

    // @ts-ignore
    private app: DraftApp;
    private _config: boolean = false;

    private constructor() {}

    public static get(): Draft {
        if (!Draft.instance) {
            Draft.instance = new Draft();
        }
        return Draft.instance;
    }

    public async config() {
        if (this._config) {
            return;
        }
        this.app = await DraftApp.new();
    }

    public resize(width: number, height: number) {
        this.app.resize(width, height);
    }

    public startDraw() {
        if (this.drawIntervalId != null) {
            return;
        }
        const interval = 1000 / this.fps;
        this.drawIntervalId = window.setInterval(() => {
            this.draw();
        }, interval);
    }

    private draw() {
        this.app.draw();
    }

    public stopDraw() {
        if (this.drawIntervalId !== null) {
            clearInterval(this.drawIntervalId);
            this.drawIntervalId = null;
        }
    }
}
