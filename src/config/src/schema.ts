import * as schema from 'schema/index';
import * as video from 'video/index';

export const schemaConfig: schema.Config = {
    video: 'video/video',
    collection: [
        { name: 'video/zone' },
        { name: 'video/interval' },
        { name: 'actions/transition', proto: video.TransitionActionInfo.prototype },
        { name: 'actions/zonal-transition' },
        { name: 'actions/zonal-rule' },
        { name: 'events/click', proto: video.ClickEventInfo.prototype },
        { name: 'events/choose' },
        { name: 'events/choice' },
    ]
};