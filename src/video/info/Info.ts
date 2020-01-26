import * as video from 'video/index';

export class Info {
    readonly fps: number;
    readonly name: string;
    readonly format: string;
    readonly begin?: video.ActionInfo[];
    readonly end?: video.ActionInfo[];
    readonly events?: video.EventInfo[];
    readonly zones?: any;
}