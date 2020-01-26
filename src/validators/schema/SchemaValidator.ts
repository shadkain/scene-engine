import * as v from 'validators/index';
import { Schema } from 'schema/index';

export class SchemaValidator {
    private _service: v.Service;

    constructor(service: v.Service) {
        this._service = service;
    }

    public validate(object: Object, schema: Schema): v.Result {
        const newObject = {};

        const entries = Object.entries(schema.props);
        const n = entries.length;
        for (let i = 0; i < n; ++i) {
            const [key, value] = entries[i];
            if (!object.hasOwnProperty(key) || object[key] === null) {
                if (value.required) {
                    console.log(`Missing required property: ${key}`);
                    return { ok: false };
                }

                if (value.default !== null) {
                    newObject[key] = value.default;
                }
            } else {
                const vr = this.validateTypes(object[key], value.types);
                if (!vr.ok) {
                    console.log(`Property not passed validation: ${key}`);
                    return { ok: false };
                }

                newObject[key] = vr.cache;
            }
        }

        if (schema.proto) {
            newObject['__proto__'] = schema.proto;
        }

        return { ok: true, cache: newObject };
    }

    private validateTypes(prop: any, types: string[]): v.Result {
        const n = types.length;
        for (let i = 0; i < n; ++i) {
            const vr = this._service.validateProperty({
                prop: prop,
                type: types[i],
            });
            
            if (vr.ok) {
                return vr;
            }
        }

        return { ok: false };
    }
}