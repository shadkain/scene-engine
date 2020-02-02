import * as bind from 'bind/index';

export class PrimitiveBinder
implements bind.SlaveBinder {
    public bind(pair: bind.PropTypePair): bind.Result {
        return { ok: typeof(pair.prop) === pair.type, cache: pair.prop };
    }
}