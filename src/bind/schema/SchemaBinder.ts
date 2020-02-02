import * as v from 'bind/index';
import * as logger from 'logger/index';
import { Schema } from 'schema/index';

export class SchemaBinder {
    private _service: v.Service;

    constructor(service: v.Service) {
        this._service = service;
    }

    public bind(object: Object, schema: Schema): v.Result {
        const entries = Object.entries(schema.props);
        for (let i = entries.length; i--;) {
            const [key, value] = entries[i];
            if (!object.hasOwnProperty(key) || object[key] === null) {
                if (value.required) {
                    logger.error(`missing required property: ${key}`);
                    return { ok: false };
                } else if (value.default !== null) {
                    object[key] = value.default;
                }
            } else {
                const vr = this.checkTypes(object[key], value.types);
                if (!vr.ok) {
                    logger.error(`binding property failed: ${key}`);
                    return { ok: false };
                }

                object[key] = vr.cache;
            }
        }

        if (schema.proto) {
            object['__proto__'] = schema.proto;
        }

        return { ok: true, cache: object };
    }

    private checkTypes(prop: any, types: string[]): v.Result {
        const n = types.length;
        for (let i = 0; i < n; ++i) {
            const vr = this._service.bindProperty(prop, types[i]);
            
            if (vr.ok) {
                return vr;
            }
        }

        return { ok: false };
    }
}