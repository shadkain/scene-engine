export type PrimitiveTypeof = 'string' | 'number' | 'boolean';
export type PrimitiveType = string | number | boolean;

export interface EmptyConstructor<T> {
    new(): T;
}

type PropType<T> = PrimitiveTypeof | EmptyConstructor<T>;

export interface IPropMetadata<T> {
    key: string;
    type: PropType<T> | [PropType<T>];
    nullable?: boolean;
}

export class PropMetadata<T> {
    key: string;
    nullable?: boolean;
    private _type: PropType<T>;
    private _isObject: boolean;
    private _isArray: boolean;

    constructor(info: IPropMetadata<T>) {
        this.key = info.key;
        this.nullable = this.nullable;
        this.retrieveType(info.type);
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

    public getConstructor(): EmptyConstructor<T> {
        return this._type as EmptyConstructor<T>;
    }

    private retrieveType(typeContainer: PropType<T> | [PropType<T>]) {
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