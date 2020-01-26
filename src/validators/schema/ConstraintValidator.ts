import * as v from 'validators/index';

export class ConstraintValidator
implements v.SlaveValidator {
    private _storage: v.type.Storage;

    constructor(storage: v.type.Storage) {
        this._storage = storage;;
    }

    public validate(pair: v.PropertyTypePair): v.Result {
        const validator = this._storage.get(pair.type);
        if (!validator) {
            return { ok: false };
        }
                
        return validator.validate(pair.prop);
    }
}