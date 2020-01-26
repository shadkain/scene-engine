import * as video from 'video/index';

export class Clip {
    private _frameEval: video.FrameEvaluator;
    private _component: video.Component;
    private _resource: video.Resource;
    readonly element: HTMLVideoElement;

    constructor(resource: video.Resource, fps: number) {
        this.element = document.createElement('video');

        this._frameEval = new video.FrameEvaluator(fps);
        this._resource = resource;

        this.element.src = resource.url;
    }

    get frame(): number {
        return this._frameEval.toFrame(this.element.currentTime);
    }

    set frame(value: number) {
        this.element.currentTime = this._frameEval.toTime(value);
    }

    get name(): string {
        return this._component.info.name;
    }

    public play() {
        this.element.play();
    }

    public pause() {
        this.element.pause();
    }

    public attachComponent(component: video.Component): video.Clip {
        this._component = component;
        this._component.init();

        return this;
    }

    public destroy() {
        this._resource.destroy();

        if (this._component) {
            this._component.destroy();
        }
    }

    // Static methods
    static fromComponent(resource: video.Resource, component: video.Component): Clip {
        const clip = new Clip(resource, component.info.fps);
        clip.attachComponent(component);

        return clip;
    }
}