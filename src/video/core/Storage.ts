import * as video from 'video/index';

export type StorageEntry = { 
    component: video.Component,
    resource?: video.Resource,
};

export class Storage {
    private _map: Map<string, StorageEntry>;

    constructor() {
        this._map = new Map();
    }

    public has(name: string): boolean {
        return this._map.has(name);
    }

    public get(name: string): StorageEntry {
        return this._map.get(name);
    }

    public set(name: string, entry: StorageEntry) {
        this._map.set(name, entry);
    }

    public delete(name: string) {
        const entry = this._map.get(name);
        if (!entry) {
            return;
        }
        
        if (entry.resource) {
            entry.resource.destroy();
        }
        entry.component.reset();

        this._map.delete(name);
    }
}