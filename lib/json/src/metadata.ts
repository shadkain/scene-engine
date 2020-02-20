import 'reflect-metadata';
import * as json from '../pkg';

const JSON_METADATA_SYMBOL = Symbol('json-metadata-symbol');

export function getPropertyMetadata(target: Object, propertyKey: string): json.PropMetadata<any> {
    return Reflect.getMetadata(JSON_METADATA_SYMBOL, target, propertyKey);
}

export function setPropertyMetadata<T>(meta: json.PropMetadata<T>, target: Object, propertyKey: string) {
    Reflect.defineMetadata(JSON_METADATA_SYMBOL, meta, target, propertyKey);
}

export function getObjectMetadata(target: Object): json.ObjectMetadata {
    return Reflect.getMetadata(JSON_METADATA_SYMBOL, target);
}

export function setObjectMetadata(meta: json.ObjectMetadata, target: Object) {
    Reflect.defineMetadata(JSON_METADATA_SYMBOL, meta, target);
}

export function mustGetPropertyMetadata(target: Object, propertyKey: string): json.PropMetadata<any> {
    const propMeta = getPropertyMetadata(target, propertyKey);
    if (!propMeta || !(propMeta instanceof json.PropMetadata)) {
        throw new json.BindError(`property info has wrong type or missing`);
    }

    return propMeta;
}

export function mustGetObjectMetadata(target: Object): json.ObjectMetadata {
    const objMeta = getObjectMetadata(target);
    if (!objMeta || !(objMeta instanceof json.ObjectMetadata)) {
        throw new json.BindError(`object metadata has wrong type or missing`);
    }

    return objMeta;
}

export function mustGetObjectProperties(target: Object): Set<string> {
    const objMeta = mustGetObjectMetadata(target);
    if (!objMeta.props) {
        throw new json.BindError(`property set is missing`);
    }

    return objMeta.props;
}