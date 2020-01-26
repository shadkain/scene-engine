import * as v from 'validators/index';
import * as schema from 'schema/index';


export class Service {
    private _schemaValidator: v.SchemaValidator;
    private _propertyValidator: v.PropertyValidator;
    private _schemaStorage: schema.Storage;

    constructor(typeValidatorStorage: v.type.Storage, schemaStorage: schema.Storage) {
        this._schemaValidator = new v.SchemaValidator(this);
        this._propertyValidator = new v.PropertyValidator(this, typeValidatorStorage);
        this._schemaStorage = schemaStorage;
    }

    public validateVideo(object: Object): v.Result {
        const videoSchema = this._schemaStorage.getBase(schema.BaseSchemaType.video);
        return this._schemaValidator.validate(object, videoSchema);
    }

    public validateProperty(pair: v.PropertyTypePair): v.Result {
        return this._propertyValidator.validate(pair);
    }

    public validateWithinSchema(object: Object, schemaId: schema.ID): v.Result {
        const objectSchema = this._schemaStorage.get(schemaId);
        return this._schemaValidator.validate(object, objectSchema);
    }
}