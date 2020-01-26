import * as schema from 'schema/index';

export type ID = {
    type: string,
    id: string,
}

export class Storage {
    private _map: Map<string, Map<string, schema.Schema>>;
    private _baseMap: Map<schema.BaseSchemaType, schema.Schema>;

    constructor(...entries: schema.Schema[]) {
        this._map = new Map();
        this._baseMap = new Map();
        entries.forEach(entry => {
            this.set(entry);
        });
    }

    public get(schemaId: ID): schema.Schema {
        const typeMap = this._map.get(schemaId.type);
        if (!typeMap) {
            return null;
        }
        const schema = typeMap.get(schemaId.id);
        if (!schema) {
            return null;
        }

        return schema;
    }

    public set(schema: schema.Schema) {
        let typeMap = this._map.get(schema.type);
        if (!typeMap) {
            typeMap = new Map();
            this._map.set(schema.type, typeMap);
        }

        typeMap.set(schema.id, schema);
    }

    public getBase(baseType: schema.BaseSchemaType): schema.Schema {
        return this._baseMap.get(baseType);
    }

    public setBase(baseType: schema.BaseSchemaType, schema: schema.Schema) {
        this._baseMap.set(baseType, schema);
    }
}