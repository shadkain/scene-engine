import * as json from '../pkg';

export interface IDerivedMetadata<T> {
    base: json.Constructor<T>;
    tag: string;
}

export class ObjectMetadata {
    base?: json.Constructor;
    abstract?: boolean;
    private _propsMeta?: Map<string, json.PropMetadata>;
    private _derivedCtrs?: Map<string, json.Constructor>;

    public forEachProperty(callback: (propertyKey: string, propertyMeta: json.PropMetadata) => void) {
        json.meta.get(this.base)?.forEachProperty(callback);

        this._propsMeta?.forEach((meta, key) => {
            callback(key, meta);
        });
    }

    public setPropMetadata(propertyKey: string, meta: json.PropMetadata) {
        if (!this._propsMeta) this._propsMeta = new Map();

        this._propsMeta.set(propertyKey, meta);
    }

    public getDerivedCtr(tag: string): json.Constructor {
        return this._derivedCtrs?.get(tag);
    }

    public setDerivedCtr(tag: string, ctr: json.Constructor) {
        if (!this._derivedCtrs) this._derivedCtrs = new Map();

        this._derivedCtrs.set(tag, ctr);
    }
}