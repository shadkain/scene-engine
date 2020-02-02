import * as bind from 'bind/index';
import * as schema from 'schema/index';

export class Service {
    private _schemaValidator: bind.SchemaBinder;
    private _propertyValidator: bind.PropertyBinder;
    private _schemaStorage: schema.Storage;

    constructor(typeValidatorStorage: bind.type.Storage, schemaStorage: schema.Storage) {
        this._schemaValidator = new bind.SchemaBinder(this);
        this._propertyValidator = new bind.PropertyBinder(this, typeValidatorStorage);
        this._schemaStorage = schemaStorage;
    }

    public bindVideo(object: Object): bind.Result {
        const videoSchema = this._schemaStorage.getBase(schema.BaseSchemaType.video);
        return this._schemaValidator.bind(object, videoSchema);
    }

    public bindProperty(prop: any, type: string): bind.Result {
        return this._propertyValidator.bind(prop, type);
    }

    public bindSchema(object: Object, schemaId: schema.ID): bind.Result {
        const objectSchema = this._schemaStorage.get(schemaId);
        return this._schemaValidator.bind(object, objectSchema);
    }
}