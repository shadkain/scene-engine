import * as video from 'video/index';

export class Service {
    private _engine: video.Engine;
    private _clipCache: video.ClipCache;

    constructor(loader: video.Loader) {
        this._engine = new video.Engine(this);
        this._clipCache = new video.ClipCache(this, loader);
    }

    public retainResource(name: string) {
        this._clipCache.retain(name);
    }

    public releaseResource(name: string) {
        this._clipCache.release(name);
    }

    public performTransition(info: video.TransitionActionInfo) {
        const clip = this._clipCache.retain(info.to);
        this._engine.setClip(clip);
    }
}