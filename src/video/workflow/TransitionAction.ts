import * as video from 'video/index';

export class TransitionAction
implements video.Action {
    private _component: video.Component;
    readonly info: video.TransitionActionInfo;

    constructor(component: video.Component, info: video.TransitionActionInfo) {
        this._component = component;
        this.info = info;
    }

    public charge() {
        console.log(`transition prepared:`);
        console.log(this.info);
        this._component.service.requestVideo(this.info.to);
    }

    public uncharge() {

    }

    public run() {
        console.log(`transition run:`);
        console.log(this.info);
        this._component.service.performTransition(this.info);
    }
}
