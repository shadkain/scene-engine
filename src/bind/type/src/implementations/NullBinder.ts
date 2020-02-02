import * as bind from 'bind/index';

export class NullBinder
implements bind.type.Binder {
    public bind(data: any): bind.Result {
        return { ok: data === null, cache: null };
    }
}