import * as video from 'video/index';

export class TransitionActionInfo
implements video.ActionInfo {
    readonly to: string;
    readonly entry: number;
    readonly delay?: number;

    constructor(infoObject: Object) {
        this.to = infoObject['to'];
        this.entry = infoObject['entry'];
        this.delay = infoObject['delay'];
    }

    public create(component: video.Component): video.TransitionAction {
        return new video.TransitionAction(component, this);
    }
}