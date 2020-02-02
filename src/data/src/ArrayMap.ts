export class ArrayMap<K, V> {
    private _map: Map<K, V[]>;

    constructor() {
        this._map = new Map();
    }

    get size(): number {
        return this._map.size;
    }

    public has(key: K): boolean {
        return this._map.has(key);
    }

    public get(key: K): V[] {
        return this._map.get(key);
    }

    public set(key: K, array: V[]): ArrayMap<K, V> {
        this._map.set(key, array);
        return this;
    }

    public delete(key: K): boolean {
        return this._map.delete(key);
    }

    public push(key: K, ...values: V[]) {
        let array = this._map.get(key);
        if (!array) {
            array = [];
            this._map.set(key, array);
        }

        array.push(...values);
    }

    public pop(key: K): V {
        const array = this._map.get(key);
        if (!array) return null;

        return array.pop();
    }

    public forEach(callback: (value: V, index: number, key: K) => void) {
        this._map.forEach((array, key) => {
            array.forEach((value, index) => {
                callback(value, index, key);
            });
        });
    }

    public forEachArray(callback: (array: V[], key: K) => void) {
        this._map.forEach(callback);
    }

    public forEachForKey(key: K, callback: (value: V, index: number) => void) {
        const array = this._map.get(key);
        if (!array) return;

        array.forEach(callback);
    }

    public clear() {
        this._map.clear();
    }
}