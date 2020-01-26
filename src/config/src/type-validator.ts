import * as valid from 'validators/index';

export const typeValidatorConfig: valid.type.Config = {
    collection: [
        { type: 'frame', validator: new valid.type.FrameValidator() },
        { type: 'frame-timecode', validator: new valid.type.FrameTimecodeValidator(25) },
    ]
};