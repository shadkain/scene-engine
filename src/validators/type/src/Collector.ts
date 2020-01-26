import * as v from 'validators/index';

export class Collector {
    readonly storage: v.type.Storage;
    private _config: v.type.Config;

    constructor(config: v.type.Config) {
        this.storage = new v.type.Storage();
        this._config = config;
    }

    public collect(): Collector {
        this._config.collection.forEach(entry => {
            this.storage.set(entry);
        });

        return this;
    }
}