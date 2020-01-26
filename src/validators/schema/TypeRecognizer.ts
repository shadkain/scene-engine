export const enum TypeId {
    primitive,
    constrained,
    object,
    array
}

export class TypeRecognizer {
    private _types: Map<TypeId, string>;

    constructor() {
        this._types = new Map();
        this._types
            .set(TypeId.constrained, '<>')
            .set(TypeId.object, '{}')
            .set(TypeId.array, '[]');
    }

    public recognize(type: string): { typeId: TypeId, retrievedType: string } {
        const entries = this._types.entries();

        let res = entries.next();
        while (!res.done) {
            const [key, braces] = res.value;
            if (type[0] === braces[0] && type[type.length - 1] === braces[1]) {
                return {
                    typeId: key,
                    retrievedType: type.slice(1, type.length - 1),
                }
            }
            res = entries.next();
        }

        return { typeId: TypeId.primitive, retrievedType: type };
    }
}