import * as bind from 'bind/index';
import * as logger from 'logger/index';

export class ConstraintBinder
implements bind.SlaveBinder {
    private _storage: bind.type.Storage;

    constructor(storage: bind.type.Storage) {
        this._storage = storage;
    }

    public bind(pair: bind.PropTypePair): bind.Result {
        const binder = this._storage.get(pair.type);
        if (!binder) {
            logger.error(`type binder storage has no binder: ${pair.type}`);
            return { ok: false };
        }
                
        return binder.bind(pair.prop);
    }
}