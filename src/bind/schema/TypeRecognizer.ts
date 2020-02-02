export const enum SlaveBinderType {
    primitive,
    constrained,
    object,
    array
}

export class TypeRecognizer {
    private _types: Map<SlaveBinderType, string>;

    constructor() {
        this._types = new Map();
        this._types
            .set(SlaveBinderType.constrained, '<>')
            .set(SlaveBinderType.object, '{}')
            .set(SlaveBinderType.array, '[]');
    }

    public recognize(type: string): { binderType: SlaveBinderType, retrievedType: string } {
        const entries = this._types.entries();

        let res = entries.next();
        while (!res.done) {
            const [key, braces] = res.value;
            if (type[0] === braces[0] && type[type.length - 1] === braces[1]) {
                return {
                    binderType: key,
                    retrievedType: type.slice(1, type.length - 1),
                }
            }
            res = entries.next();
        }

        return { binderType: SlaveBinderType.primitive, retrievedType: type };
    }
}