import * as video from 'video/index';

export class Clip {
    readonly element: HTMLVideoElement;
    private _frameEval: video.FrameEvaluator;
    private _component: video.Component;
    private _resource: video.Resource;

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

    public attachComponent(component: video.Component) {
        this._component = component;
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