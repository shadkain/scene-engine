import * as event from 'event/index';

export class Bus<K> {
    private _channels: Map<K, Set<Function>>;

    constructor() {
        this._channels = new Map();
    }

    public createService(): event.BusService<K> {
        return new event.BusService(this);
    }

    public on(key: K, handler: Function) {
        let channel = this._channels.get(key);
        if (!channel) {
            channel = new Set();
            this._channels.set(key, channel);
        }

        channel.add(handler);
    }

    public off(key: K, handler: Function) {
        const channel = this._channels.get(key);
        if (!channel) {
            return;
        }

        channel.delete(handler);
        if (!channel.size) {
            this.dropChannel(key);
        }
    }

    public emit(key: K, ...args: any[]) {
        const channel = this._channels.get(key);
        if (!channel) {
            return;
        }

        channel.forEach(handler => handler(...args));
    }

    public dropChannel(key: K) {
        this._channels.delete(key);
    }

}