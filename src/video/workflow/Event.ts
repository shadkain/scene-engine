import * as video from 'video/index';

export abstract class Event {
    protected _component: video.Component;
    protected _actionMap: Map<number|string, video.Action[]>;
    protected _isActive: boolean;
    readonly info: video.EventInfo;

    constructor(component: video.Component, info: video.EventInfo) {
        this.info = info;
        this._component = component;
        this._actionMap = new Map();
        this._isActive = false;
    }

    public activate() {
        // TODO: implement
        this._isActive = true;
        console.log('event activated');
    }

    public deactivate() {
        if (!this._isActive) return;
        this._isActive = false;
        console.log('event deactivated');
    }

    public charge() {
        this._actionMap.forEach(array => {
            array.forEach(action => action.charge());
        });
    }

    public uncharge() {
        this._actionMap.forEach(array => {
            array.forEach(action => action.uncharge());
        });
    }

    protected storeActions(key: number|string, infoArray: video.ActionInfo[]) {
        const actions: video.Action[] = [];

        infoArray.forEach(actionInfo => {
            actions.push(actionInfo.create(this._component));
        });

        this._actionMap.set(key, actions);
    }

    protected runActions(key: number|string) {
        const actions = this._actionMap.get(key);
        if (actions) {
            actions.forEach(action => action.run());
        }
    }
}