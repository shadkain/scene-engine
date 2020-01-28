import * as video from 'video/index';
import * as html from 'html/index';

export class Clip {
    private _resource: video.Resource;
    private _frameEvaluator: video.FrameEvaluator;
    private _frameEmitter: video.FrameEmitter;
    private _eventManager: html.VideoEventManager;
    readonly component: video.Component;
    readonly element: HTMLVideoElement;

    constructor(resource: video.Resource, component: video.Component) {
        this.component = component;
        this.element = document.createElement('video');
        this._resource = resource;
        this._frameEvaluator = new video.FrameEvaluator(component.info.fps);
        this._frameEmitter = new video.FrameEmitter(this);
        this._eventManager = new html.VideoEventManager(this.element);
    
        this.initElement();
        this.initComponent();
    }

    get frame(): number {
        return this._frameEvaluator.toFrame(this.element.currentTime);
    }

    set frame(value: number) {
        this.element.currentTime = this._frameEvaluator.toTime(value);
    }

    get name(): string {
        return this.component.info.name;
    }

    public play() {
        this.element.play();
        this._frameEmitter.start();
    }

    public pause() {
        this.element.pause();
        this._frameEmitter.stop();
    }

    public destroy() {
        this._resource.destroy();
        this.component.destroy();
        this._eventManager.destroy();
    }

    private initComponent() {
        this.component.init();

        let wasPlayed = false;
        this._eventManager.on('play', () => {
            if (!wasPlayed) {
                this.component.begin();
                this._frameEmitter.init(this.frame);

                wasPlayed = true;
            }
        });
        this._eventManager.on('ended', this.component.end.bind(this.component));
    }

    private initElement() {
        this.element.src = this._resource.url;
    }
}