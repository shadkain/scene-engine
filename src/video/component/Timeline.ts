import * as video from 'video/index';

interface PresetOptions {
    frame: number,
    handler: () => void,
    offset: number,
    prehandler: () => void,
}

export class Timeline {
    private _map: Map<number, (() => void)[]>;

    constructor() {
        this._map = new Map();
    }

    public preset(opts: PresetOptions) {
        this.set(opts.frame, opts.handler);

        let preframe = opts.frame - opts.offset;
        if (preframe < 0) {
            preframe = video.Moment.begin;
        }

        this.set(preframe, opts.prehandler);
    }

    public set(frame: number, handler: () => void) {
        let handlers = this._map.get(frame);
        if (!handlers) {
            handlers = [];
            this._map.set(frame, handlers);
        }

        handlers.push(handler);
    }

    public emit(frame: number) {
        const handlers = this._map.get(frame);
        if (!handlers) {
            return;
        }

        handlers.forEach(handler => handler());
    }

    public clear() {
        this._map.clear();
    }
}