import * as event from 'event/index';

export const enum RetainerEvent {
    fullRelease
}

export class Retainer
implements event.BoxUser<RetainerEvent> {
    private _strength: number;
    private _eventBox: event.Box<RetainerEvent>;

    constructor() {
        this._strength = 0;
        this._eventBox = new event.Box();
    }

    public retain(): Retainer {
        ++this._strength;
        return this;
    }

    public release(): Retainer {
        if (!--this._strength) {
            this._eventBox.emit(RetainerEvent.fullRelease);  
        }

        return this;
    }

    public on(event: RetainerEvent, handler: () => void): Retainer {
        this._eventBox.on(event, handler);
        return this;
    }

    public off(event: RetainerEvent): Retainer {
        this._eventBox.off(event);
        return this;
    }

    public destroy() {
        this._eventBox.clear();
    }
}