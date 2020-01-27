import * as video from 'video/index';

export class FrameEmitter {
    private _clip: video.Clip;
    private _component: video.Component;
    private _lastFrame: number;
    private _rafId: number;
    private _isActive: boolean;

    constructor(clip: video.Clip) {
        this._clip = clip;
        this._component = clip.component;
        this._lastFrame = -1;

        this.tick = this.tick.bind(this);
    }

    public init(frame: number) {
        this._lastFrame = frame - 1;
    }

    public start() {
        if (this._isActive) return;
        this._rafId = requestAnimationFrame(this.tick);
        this._isActive = true;
    }

    public stop() {
        cancelAnimationFrame(this._rafId);
        this._isActive = false;
    }

    private emitFrames() {
        const currentFrame = this._clip.frame;
        if (currentFrame <= this._lastFrame) return;

        for (let i = this._lastFrame; i < currentFrame; ++i) {
            this._component.emit(i + 1);
        }

        this._lastFrame = currentFrame;
    }

    private tick() {
        this._rafId = requestAnimationFrame(this.tick);
        this.emitFrames();
    }
}
