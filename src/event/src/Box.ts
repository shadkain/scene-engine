export class Box<K> {
    private _eventMap: Map<K, Function>;

    constructor() {
        this._eventMap = new Map();
    }

    public on(key: K, handler: Function) {
        this._eventMap.set(key, handler);
    }

    public off(key: K) {
        this._eventMap.delete(key);
    }

    public emit(key: K, ...args: any[]) {
        const handler = this._eventMap.get(key);
        if (handler) {
            handler(...args);
        }
    }

    public clear() {
        this._eventMap.clear();
    }
}