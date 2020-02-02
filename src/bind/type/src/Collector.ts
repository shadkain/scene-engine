import * as bind from 'bind/index';

export class Collector {
    readonly storage: bind.type.Storage;
    private _config: bind.type.Config;

    constructor(config: bind.type.Config) {
        this.storage = new bind.type.Storage();
        this._config = config;
    }

    public collect(): Collector {
        this._config.collection.forEach(entry => {
            this.storage.set(entry);
        });

        return this;
    }
}