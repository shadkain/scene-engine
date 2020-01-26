import * as video from 'video/index';

export type ResourceInfoPair = {
    info: video.Info,
    resource: video.Resource,
}

export interface Loader {
    load(name: string): ResourceInfoPair;
    loadInfo(name: string): video.Info;
    loadResource(info: video.Info): video.Resource;
}