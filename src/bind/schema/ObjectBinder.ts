import * as bind from 'bind/index';
import * as logger from 'logger/index';
import * as schema from 'schema/index';

export class ObjectBinder
implements bind.SlaveBinder {
    private _service: bind.Service;

    constructor(service: bind.Service) {
        this._service = service;
    }

    public bind(pair: bind.PropTypePair): bind.Result {
        if (!(pair.prop instanceof Object)) {
            logger.error(`property is not object`);
            return { ok: false };
        }

        const parts = pair.type.split(':');
        if (parts.length === 1) {
            return this.bindHalfTyped(pair);
        } else if (parts.length === 2) {
            return this.bindFullTyped(pair.prop, {
                group: parts[0],
                type: parts[1],
            });
        }

        return { ok: false };
    }

    private bindHalfTyped(pair: bind.PropTypePair): bind.Result {
        const type = pair.prop['type'];
        if (!type) {
            return { ok: false };
        }

        return this.bindFullTyped(pair.prop, {
            type: pair.type,
            group: type,
        });
    }

    private bindFullTyped(obj: Object, schemaId: schema.ID): bind.Result {
        return this._service.bindSchema(obj, schemaId);
    }
}