import * as video from 'video/index';
import * as display from 'display/index';

export interface Application {
    readonly root: HTMLDivElement;
    readonly videoService: video.Service;
    readonly displayService: display.Service;
}