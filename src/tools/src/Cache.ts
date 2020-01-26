import * as event from 'event/index';

export const enum CacheEvent {
    delete
}

export class Cache<K, V>
implements event.BoxUser<CacheEvent> {
    private _map: Map<K, V>;
    private _eventBox: event.Box<CacheEvent>;

    constructor() {
        this._map = new Map();
        this._eventBox = new event.Box();
    }

    public set(key: K, value: V) {
        this._map.set(key, value);
    }

    public get(key: K): V {
        return this._map.get(key);
    }

    public delete(key: K) {
        const entry = this._map.get(key);
        this._eventBox.emit(CacheEvent.delete, entry);
        this._map.delete(key);
    }

    public on(key: CacheEvent, handler: (entry: V) => void) {
        this._eventBox.on(key, handler);
    }

    public off(key: CacheEvent) {
        this._eventBox.off(key);
    }

    public destroy() {
        this._eventBox.clear();
    }
}