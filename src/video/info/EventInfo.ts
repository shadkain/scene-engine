import * as video from 'video/index';

export interface EventInfo {
    readonly on: number;
    readonly off: number;
    create(component: video.Component): video.Event;
}