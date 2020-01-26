import * as schema from 'schema/index';

type Entry = { 
    name: string,
    proto?: Object,
};

export class Collector {
    readonly storage: schema.Storage;
    private _loader: schema.Loader;
    private _config: schema.Config;

    constructor(loader: schema.Loader, config: schema.Config) {
        this.storage = new schema.Storage();
        this._loader = loader;
        this._config = config;
    }

    public collect(): Collector {
        this.collectBase(schema.BaseSchemaType.video, this._config.video);
        this.collectCollection(this._config.collection);

        return this;
    }

    private collectCollection(collection: Entry[]) {
        collection.forEach(entry => {
            const schema = this._loader.loadVideoSchema(entry.name);
            if (!schema) {
                return;
            }

            if (entry.proto) {
                schema.proto = entry.proto;
            }

            this.storage.set(schema);
        });
    }

    private collectBase(type: schema.BaseSchemaType, name: string) {
        const schema = this._loader.loadVideoSchema(name);
        if (!schema) {
            return;
        }

        this.storage.setBase(type, schema);
    }
}