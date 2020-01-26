import * as v from 'validators/index';

export class PropertyValidator {
    private _recognizer: v.TypeRecognizer;
    private _slaves: Map<v.TypeId, v.SlaveValidator>;

    constructor(service: v.Service, typeValidatorStorage: v.type.Storage) {
        this._recognizer = new v.TypeRecognizer();
        this._slaves = new Map();
        this._slaves
            .set(v.TypeId.primitive, new v.PrimitiveValidator())
            .set(v.TypeId.constrained, new v.ConstraintValidator(typeValidatorStorage))
            .set(v.TypeId.object, new v.ObjectValidator(service))
            .set(v.TypeId.array, new v.ArrayValidator(service));
    }

    public validate(pair: v.PropertyTypePair): v.Result {
        const rr = this._recognizer.recognize(pair.type);
        const validator = this._slaves.get(rr.typeId);

        return validator.validate({
            prop: pair.prop,
            type: rr.retrievedType,
        });
    }
}