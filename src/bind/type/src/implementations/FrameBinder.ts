import * as bind from 'bind/index';

export class FrameBinder
implements bind.type.Binder {
    public bind(data: any): bind.Result {
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