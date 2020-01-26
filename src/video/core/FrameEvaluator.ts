export class FrameEvaluator {
    readonly fps: number;
    private _eps: number;

    constructor(fps: number) {
        this.fps = fps;
        this._eps = 1e-3;
    }

    public toFrame(time: number) {
        return Math.round(time * this.fps);
    }

    public toTime(frame: number) {
        return frame / this.fps + this._eps;
    }
}