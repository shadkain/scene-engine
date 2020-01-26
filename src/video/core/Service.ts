import * as video from 'video/index';

export class Service {
    private _engine: video.Engine;
    private _clipCache: video.ClipCache;

    constructor(loader: video.Loader) {
        this._clipCache = new video.ClipCache(loader);
        
        this._engine = new video.Engine();
    }

    public retainResource(name: string) {
    }

    public releaseResource(name: string) {
    }

    public performTransition(info: video.TransitionActionInfo) {
    }
}