export type PrimitiveTypeof = 'string' | 'number' | 'boolean';
export type PrimitiveType = string | number | boolean;

export interface Constructor<T = Object>
extends Object {
    new(): T;
}

export interface Prototype {
    constructor: Function;
}

type PropType = PrimitiveTypeof | Constructor;

export interface IPropMetadata {
    key: string;
    type: PropType | [PropType];
    nullable?: boolean;
}

export class PropMetadata {
    key: string;
    nullable?: boolean;
    private _type: PropType;
    private _isObject: boolean;
    private _isArray: boolean;

    constructor(meta: IPropMetadata) {
        this.key = meta.key;
        if (meta.nullable) this.nullable = meta.nullable;
        this.retrieveType(meta.type);
    }

    public isObject(): boolean {
        return this._isObject;
    }

    public isArray(): boolean {
        return this._isArray;
    }

    public getTypeof(): PrimitiveTypeof {
        return this._type as PrimitiveTypeof;
    }

    public getCtr(): Constructor {
        return this._type as Constructor;
    }

    private retrieveType(typeContainer: PropType | [PropType]) {
        if (typeContainer instanceof Array) {
            this._isArray = true;
            this._type = typeContainer[0];
        } else {
            this._type = typeContainer;
        }

        if (this._type instanceof Object) {
            this._isObject = true;
        }
    }
}