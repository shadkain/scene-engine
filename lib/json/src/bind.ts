import * as json from '../pkg';

/**
 * Binds json-object to specified class. Throws `json.Error` on any failure.
 * @param jsonObject Json-object.
 * @param ctr Class constructor.
 */
export function bind<T>(jsonObject: Object, ctr: json.EmptyConstructor<T>): T {
    const target = new ctr();

    json.mustGetObjectProperties(target).forEach((targetKey) => {
        const propMeta = json.mustGetPropertyMetadata(target, targetKey);

        const prop = jsonObject[propMeta.key];
        if (prop == null && !propMeta.nullable) {
            throw new json.BindError(`required property key "${propMeta.key}" is null or missing`);
        }
        
        if (propMeta.isArray()) {
            target[targetKey] = bindArray(prop, propMeta);
        } else if (!propMeta.isObject()) {
            target[targetKey] = bindPrimitive(prop, propMeta);
        } else {
            target[targetKey] = bindObject(prop, propMeta);
        }
    });

    return target;
}

function bindArray(jsonObject: any, meta: json.PropMetadata<any>): any[] {
    if (!(jsonObject instanceof Array)) {
        throw new json.WrongInstanceError(meta.key, 'array');
    }

    const binderFunc = meta.isObject() ? bindObject : bindPrimitive;
    jsonObject.forEach((element, i) => {
        jsonObject[i] = binderFunc(element, meta);
    });

    return jsonObject;
}

function bindObject(jsonObject: any, meta: json.PropMetadata<any>): Object {
    if (!(jsonObject instanceof Object)) {
        throw new json.WrongInstanceError(meta.key, 'object');
    }

    try {
        return bind(jsonObject, meta.getConstructor());
    } catch (e) {
        throw new json.InnerObjectError(meta.key, e);
    }
}

function bindPrimitive(prop: any, meta: json.PropMetadata<any>): json.PrimitiveType {
    if (typeof(prop) !== meta.getTypeof()) {
        throw new json.WrongTypeError(meta.key, meta.getTypeof(), typeof(prop));
    }

    return prop;
}