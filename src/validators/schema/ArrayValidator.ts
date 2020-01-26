import * as v from 'validators/index';

export class ArrayValidator
implements v.SlaveValidator {
    private _service: v.Service;

    constructor(service: v.Service) {
        this._service = service;
    }

    public validate(pair: v.PropertyTypePair): v.Result {
        if (!(pair.prop instanceof Array)) {
            return { ok: false };
        }

        let newArray = [];
        const n = pair.prop.length;
        for (let i = 0; i < n; ++i) {
            const vr = this._service.validateProperty({
                prop: pair.prop[i],
                type: pair.type,
            });
            
            if (!vr.ok) {
                return { ok: false };
            }

            newArray.push(vr.cache);
        }

        return {
            ok: true,
            cache: newArray,
        }
    }
}