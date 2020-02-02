import * as bind from 'bind/index';
import * as logger from 'logger/index';

export class ArrayBinder
implements bind.SlaveBinder {
    private _service: bind.Service;

    constructor(service: bind.Service) {
        this._service = service;
    }

    public bind(prop: any, type: string): bind.Result {
        if (!(prop instanceof Array)) {
            logger.error(`property is not array`);
            return { ok: false };
        }

        const array = prop;
        for (let i = array.length; i--;) {
            const vr = this._service.bindProperty(array[i], type);
            
            if (!vr.ok) {
                return { ok: false };
            }

            array[i] = vr.cache;
        }

        return {
            ok: true,
            cache: array,
        }
    }
}