import * as video from 'video/index';
import * as tools from 'tools/index';

type Entry = {
    retainer: tools.Retainer,
    clip: video.Clip,
}

export class ClipCache {
    private _cache: tools.Cache<string, Entry>;
    private _loader: video.Loader;

    constructor(loader: video.Loader) {
        this._cache = new tools.Cache();
        this._loader = loader;

        this._cache.on(tools.CacheEvent.delete, (entry) => {
            entry.retainer.destroy();
            entry.clip.destroy();
        });
    }

    public retain(name: string): video.Clip {
        const entry = this._cache.get(name);
        if (!entry) {
            return this.createEntry(name);
        }

        entry.retainer.retain();
        return entry.clip;
    }

    public release(name: string) {
        const entry = this._cache.get(name);
        if (!entry) return;

        entry.retainer.release();
    }

    private createEntry(name: string) {
        const pair = this._loader.load(name);
        const clip = new video.Clip(pair.resource, pair.info.fps);
        
        this._cache.set(name, {
            retainer: new tools.Retainer().on(tools.RetainerEvent.fullRelease, () => {
                this._cache.delete(name);
            }).retain(),
            clip: clip,
        });

        return clip;
    }
}