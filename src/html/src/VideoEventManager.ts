import * as data from 'data/index';

type ElementKeys = keyof HTMLVideoElementEventMap;
type ElementHandler<K extends ElementKeys> = (this: HTMLVideoElement, ev: HTMLVideoElementEventMap[K]) => any;

export class VideoEventManager {
    private _map: data.ArrayMap<ElementKeys, Function>;
    private _element: HTMLVideoElement;

    constructor(element: HTMLVideoElement) {
        this._element = element;
        this._map = new data.ArrayMap();
    }

    public on<K extends ElementKeys>(key: K, handler: ElementHandler<K>) {
        this._map.push(key, handler);
        this._element.addEventListener(key, handler);
    }
    
    public off<K extends ElementKeys>(key: K) {
        const array = this._map.get(key);
        if (!array) return;

        array.forEach(handler => {
            this._element.removeEventListener(key, handler as ElementHandler<K>);
        });
    }

    public destroy<K extends ElementKeys>() {
        this._map.forEach((handler, _, key) => {
            this._element.removeEventListener(key, handler as ElementHandler<K>);
        });
        this._map.clear();
    }
}