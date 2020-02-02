import * as bind from 'bind/index';

export const typeBinderConfig: bind.type.Config = {
    collection: [
        { type: 'null', binder: new bind.type.NullBinder() },
        { type: 'frame', binder: new bind.type.FrameBinder() },
        { type: 'frame-timecode', binder: new bind.type.FrameTimecodeBinder(25) },
        { type: 'positive', binder: new bind.type.PositiveBinder() }
    ]
};