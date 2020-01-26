import * as v from 'validators/index';

export class PrimitiveValidator
implements v.SlaveValidator {
    public validate(pair: v.PropertyTypePair): v.Result {
        return { ok: typeof(pair.prop) === pair.type, cache: pair.prop };
    }
}