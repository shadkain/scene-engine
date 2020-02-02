import * as bind from 'bind/index';

export class PropertyBinder {
    private _recognizer: bind.TypeRecognizer;
    private _slaves: Map<bind.SlaveBinderType, bind.SlaveBinder>;

    constructor(service: bind.Service, typeBinderStorage: bind.type.Storage) {
        this._recognizer = new bind.TypeRecognizer();
        this._slaves = new Map();
        this._slaves
            .set(bind.SlaveBinderType.primitive, new bind.PrimitiveBinder())
            .set(bind.SlaveBinderType.constrained, new bind.ConstraintBinder(typeBinderStorage))
            .set(bind.SlaveBinderType.object, new bind.ObjectBinder(service))
            .set(bind.SlaveBinderType.array, new bind.ArrayBinder(service));
    }

    public bind(prop: any, type: string): bind.Result {
        const rr = this._recognizer.recognize(type);
        const binder = this._slaves.get(rr.binderType);

        return binder.bind(prop, rr.retrievedType);
    }
}