import * as video from 'video/index';

export class InfoCache<K> {
    private _map: Map<K, video.Info>;

    constructor() {
        this._map = new Map();
    }
    
    public get(key: K): video.Info {
        return this._map.get(key);
    }

    public set(key: K, info: video.Info) {
        this._map.set(key, info);
    }

    public delete(key: K) {
        this._map.delete(key);
    }
}