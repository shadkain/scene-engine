import * as video from 'video/index';

export class ClickEventInfo
implements video.EventInfo {
    readonly on: number;
    readonly off: number;
    readonly success?: video.ActionInfo[];
    readonly fail?: video.ActionInfo[];

    public create(component: video.Component): video.ClickEvent {
        return new video.ClickEvent(component, this);
    }
}