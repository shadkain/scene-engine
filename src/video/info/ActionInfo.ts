import * as video from 'video/index';

export interface ActionInfo {
    create(component: video.Component): video.Action; 
}