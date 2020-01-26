import * as video from 'video/index';

export class ClipCache<K> {
    private _map: Map<K, video.Clip>;

    constructor() {
        this._map = new Map();
    }
    
    public get(key: K): video.Clip {
        return this._map.get(key);
    }

    public set(key: K, clip: video.Clip) {
        this._map.set(key, clip);
    }

    public delete(key: K) {
        const clip = this._map.get(key);
        if (!clip) {
            return;
        }

        clip.destroy();
    }
}