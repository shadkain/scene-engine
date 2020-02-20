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

function bindArray(jsonObject: any, info: json.PropMetadata<any>): any[] {
    if (!(jsonObject instanceof Array)) {
        throw new json.WrongInstanceError(info.key, 'array');
    }

    const binderFunc = info.isObject() ? bindObject : bindPrimitive;
    jsonObject.forEach((element, i) => {
        jsonObject[i] = binderFunc(element, info);
    });

    return jsonObject;
}

function bindObject(jsonObject: any, info: json.PropMetadata<any>): Object {
    if (!(jsonObject instanceof Object)) {
        throw new json.WrongInstanceError(info.key, 'object');
    }

    try {
        return bind(jsonObject, info.getConstructor());
    } catch (e) {
        throw new json.InnerObjectError(info.key, e);
    }
}

function bindPrimitive(prop: any, info: json.PropMetadata<any>): json.PrimitiveType {
    if (typeof(prop) !== info.getTypeof()) {
        throw new json.WrongTypeError(info.key, info.getTypeof(), typeof(prop));
    }

    return prop;
}