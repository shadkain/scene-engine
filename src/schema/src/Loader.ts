import * as schema from 'schema/index';
import * as loaders from 'loaders/index';

export class Loader {
    private _loaderService: loaders.Service;
    private _validator: schema.Validator;

    constructor(loaderService: loaders.Service) {
        this._loaderService = loaderService;
        this._validator = new schema.Validator();
    }

    loadVideoSchema(name: string): schema.Schema {
        const obj = this._loaderService.loadVideoSchema(name);
        if (!obj) {
            console.log(`schema "${name}" loading error`);
            return null;
        }

        const vr = this._validator.validate(obj);
        if (!vr.ok) {
            console.log(`schema "${name}" validation error`);
            return null;
        }

        return vr.cache;
    }
}