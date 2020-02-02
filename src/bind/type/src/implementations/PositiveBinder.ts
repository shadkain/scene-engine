import * as bind from 'bind/index';

export class PositiveBinder
implements bind.type.Binder {
    public bind(data: any): bind.Result {
        return { ok: typeof(data) === 'number' && data > 0, cache: data };
    }
}