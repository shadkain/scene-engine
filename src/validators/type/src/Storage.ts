import * as v from 'validators/index';

export type StorageEntry = {
    type: string,
    validator: v.type.TypeValidator,
}

export class Storage {
    private _storage: Map<string, v.type.TypeValidator>;

    constructor() {
        this._storage = new Map();
    }

    get(type: string) {
        const validator = this._storage.get(type);
        if (!validator) {
            return null;
        }

        return validator;
    }

    set(entry: StorageEntry) {
        this._storage.set(entry.type, entry.validator);
    }
}