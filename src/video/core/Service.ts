import * as video from 'video/index';
import * as event from 'event/index';

export const enum ServiceEvent {
    transition,
    jump
}

interface ServiceEventMap {
    [ServiceEvent.transition]: (clip: video.Clip) => void,
}

export class Service
implements event.BoxUser<ServiceEvent> {
    private _engine: video.Engine;
    private _clipCache: video.ClipCache;
    private _eventBox: event.Box<ServiceEvent>;

    constructor(loader: video.Loader) {
        this._engine = new video.Engine(this);
        this._clipCache = new video.ClipCache(this, loader);
        this._eventBox = new event.Box();
    }

    public retainResource(name: string) {
        this._clipCache.retain(name);
    }

    public releaseResource(name: string) {
        this._clipCache.release(name);
    }

    public performTransition(info: video.TransitionActionInfo) {
        const clip = this._clipCache.retain(info.to);
        this._engine.replaceClip(clip);

        this._eventBox.emit(ServiceEvent.transition, clip);
    }

    public on<K extends keyof ServiceEventMap>(key: K, handler: ServiceEventMap[K]) {
        this._eventBox.on(key, handler);
    }

    public off(key: ServiceEvent) {
        this._eventBox.off(key);
    }

    public destroy() {
        this._eventBox.clear();
    }
}