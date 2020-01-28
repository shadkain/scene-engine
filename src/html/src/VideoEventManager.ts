import * as data from 'data/index';

export class VideoEventManager {
    private _map: data.ArrayMap<keyof HTMLVideoElementEventMap, Function>;
    private _element: HTMLVideoElement;

    constructor(element: HTMLVideoElement) {
        this._element = element;
        this._map = new data.ArrayMap();
    }

    public on<K extends keyof HTMLVideoElementEventMap>(key: K, handler: (this: HTMLVideoElement, ev: HTMLVideoElementEventMap[K]) => any) {
        this._map.push(key, handler);
        this._element.addEventListener(key, handler);
    }
    
    public off<K extends keyof HTMLVideoElementEventMap>(key: K) {
        const array = this._map.get(key);
        if (!array) return;

        array.forEach(handler => {
            this._element.removeEventListener(key, handler as (this: HTMLVideoElement, ev: HTMLVideoElementEventMap[K]) => any);
        });
    }

    public destroy<K extends keyof HTMLVideoElementEventMap>() {
        this._map.forEach((array, key) => {
            array.forEach(handler => {
                this._element.removeEventListener(key, handler as (this: HTMLVideoElement, ev: HTMLVideoElementEventMap[K]) => any);
            });
        });
        this._map.clear();
    }
}