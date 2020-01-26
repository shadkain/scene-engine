import * as video from 'video/index';

export class StorageController {
    private _service: video.Service;
    private _storage: video.Storage;
    private _loader: video.Loader;

    constructor(service: video.Service, loader: video.Loader, storage: video.Storage) {
        this._service = service;
        this._loader = loader;
        this._storage = storage;
    }

    public retain(name: string): boolean {
        const entry = this._storage.get(name);
        if (!entry) {
            return this.loadBoth(name);
        }
        if (!entry.resource) {
            return this.loadResource(entry);
        }

        return true;
    }

    public get(name: string) {
        return this._storage.get(name);
    }

    private loadBoth(name: string): boolean {
        const pair = this._loader.load(name);
        if (!pair) {
            return false;
        }

        this._storage.set(name, {
            component: new video.Component(this._service, pair.info),
            resource: pair.resource,
        });

        return true;
    }

    private loadResource(entry: video.StorageEntry): boolean {
        const resource = this._loader.loadResource(entry.component.info);
        if (!resource) {
            return false;
        }

        entry.resource = resource;

        return true;
    }
}