import * as v from 'validators/index';
import * as schema from 'schema/index';

export class ObjectValidator
implements v.SlaveValidator {
    private _service: v.Service;

    constructor(service: v.Service) {
        this._service = service;
    }

    public validate(pair: v.PropertyTypePair): v.Result {
        if (!(pair.prop instanceof Object)) {
            return { ok: false };
        }

        const parts = pair.type.split(':');
        if (parts.length === 1) {
            return this.validateHalfTyped(pair);
        } else if (parts.length === 2) {
            return this.validateFullTyped(pair.prop, {
                type: parts[0],
                id: parts[1],
            });
        }

        return { ok: false };
    }

    private validateHalfTyped(pair: v.PropertyTypePair): v.Result {
        const id = pair.prop['id'];
        if (!id) {
            return { ok: false };
        }

        return this.validateFullTyped(pair.prop, {
            type: pair.type,
            id: id,
        });
    }

    private validateFullTyped(obj: Object, schemaId: schema.ID): v.Result {
        return this._service.validateWithinSchema(obj, schemaId);
    }
}