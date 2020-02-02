import * as bind from 'bind/index';

export type StorageEntry = {
    type: string,
    binder: bind.type.Binder,
}

export class Storage {
    private _storage: Map<string, bind.type.Binder>;

    constructor() {
        this._storage = new Map();
    }

    public get(type: string) {
        const binder = this._storage.get(type);
        if (!binder) {
            return null;
        }

        return binder;
    }

    public set(entry: StorageEntry) {
        this._storage.set(entry.type, entry.binder);
    }
}