import * as json from '../pkg';

export const meta = new class {
    private _map: Map<json.Constructor, json.ObjectMetadata>;

    constructor() {
        this._map = new Map();
    }

    public get(target: json.Constructor): json.ObjectMetadata {
        return this._map.get(target);
    }

    public set(target: json.Constructor, meta: json.ObjectMetadata) {
        this._map.set(target, meta);
    }

    public getOrCreate(target: json.Constructor): json.ObjectMetadata {
        let meta = this.get(target);
        if (!meta) {
            meta = new json.ObjectMetadata();
            this.set(target, meta);
        }

        return meta;
    }

    public mustGet(target: json.Constructor): json.ObjectMetadata {
        const meta = this.get(target);
        if (!meta) {
            throw new json.BindError(`no metadata for class "${target.name}"`);
        }

        return meta;
    }

    public mustGetNotAbstract(target: json.Constructor): json.ObjectMetadata {
        const meta = this.mustGet(target);
        if (meta.abstract) {
            throw new json.BindToAbstractError(target.name);
        }

        return meta;
    }

    public mustGetCtrByTag(target: json.Constructor, tag: string): json.Constructor {
        const ctr = this.mustGet(target).getDerivedCtr(tag);
        if (!ctr) {
            throw new json.NonexistentTagError(tag);
        }

        return ctr;
    }
}