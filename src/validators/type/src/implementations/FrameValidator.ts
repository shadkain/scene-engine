import * as v from 'validators/index';

export class FrameValidator
implements v.type.TypeValidator {
    validate(data: any): v.Result {
        if (typeof(data) !== 'number') {
            return { ok: false };
        }
        if (!Number.isInteger(data) || data < 0) {
            return { ok: false };
        }

        return { 
            ok: true,
            cache: data
        };
    }
}