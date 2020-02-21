import * as json from '../pkg';

/**
 * Binds json-object to specified class. Throws `json.Error` on any failure.
 * @param jsonObject Json-object.
 * @param ctr Class constructor.
 */
export function bind<T>(jsonObject: Object, ctr: json.Constructor<T>): T {
    const target = new ctr();

    json.meta.mustGet(ctr).forEachProperty((targetKey, propMeta) => {
        const prop = jsonObject[propMeta.key];
        if (prop == null) {
            if (!propMeta.nullable) {
                throw new json.PropertyMissingError(propMeta.key);
            }
            
            return;
        }
        
        if (propMeta.isArray()) {
            target[targetKey] = wrapError(prop, propMeta, bindArray);
        } else if (!propMeta.isObject()) {
            target[targetKey] = wrapError(prop, propMeta, bindPrimitive);
        } else {
            target[targetKey] = wrapError(prop, propMeta, bindObject);
        }
    }); 

    return target;
}

function wrapError(prop: any, meta: json.PropMetadata, binderFunc: (prop: any, meta: json.PropMetadata) => any) {
    try {
        return binderFunc(prop, meta);
    } catch(e) {
        throw new json.ObjectError(meta.key, e);
    }
}

function bindArray(jsonObject: any, meta: json.PropMetadata): any[] {
    if (!(jsonObject instanceof Array)) {
        throw new json.WrongInstanceError('array');
    }

    const binderFunc = meta.isObject() ? bindObject : bindPrimitive;
    jsonObject.forEach((element, i) => {
        try {
            jsonObject[i] = binderFunc(element, meta);
        } catch(e) {
            throw new json.ArrayError(i, e);
        }
    });

    return jsonObject;
}

function bindObject(jsonObject: any, meta: json.PropMetadata): Object {
    if (!(jsonObject instanceof Object)) {
        throw new json.WrongInstanceError('object');
    }

    return json.objectBinder.bind(jsonObject, meta);
}

function bindPrimitive(prop: any, meta: json.PropMetadata): json.PrimitiveType {
    if (typeof(prop) !== meta.getTypeof()) {
        throw new json.WrongTypeError(meta.getTypeof());
    }

    return prop;
}