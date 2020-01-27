import * as event from 'event/index';

export class BusService<K> {
    private _bus: event.Bus<K>;
    private _channels: Map<K, Set<Function>>;

    constructor(bus: event.Bus<K>) {
        this._bus = bus;
    }

    public on(key: K, handler: Function) {
        this._bus.on(key, handler);
    }
}