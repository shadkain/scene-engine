import 'reflect-metadata';
import * as json from '../pkg';

// const JSON_METADATA_SYMBOL = Symbol('json-metadata-symbol');
const JSON_METADATA_SYMBOL = 'json';

export function getPropertyMetadata(target: Object, propertyKey: string): json.PropMetadata<any> {
    const propMeta = Reflect.getMetadata(JSON_METADATA_SYMBOL, target, propertyKey);
    return propMeta && propMeta instanceof json.PropMetadata ? propMeta : null;
}

export function setPropertyMetadata<T>(meta: json.PropMetadata<T>, target: Object, propertyKey: string) {
    Reflect.defineMetadata(JSON_METADATA_SYMBOL, meta, target, propertyKey);
}

export function getObjectMetadata(target: Object): json.ObjectMetadata {
    const objMeta = Reflect.getMetadata(JSON_METADATA_SYMBOL, target);
    return objMeta && objMeta instanceof json.ObjectMetadata ? objMeta : null;
}

export function setObjectMetadata(meta: json.ObjectMetadata, target: Object) {
    Reflect.defineMetadata(JSON_METADATA_SYMBOL, meta, target);
}

export function mustGetPropertyMetadata(target: Object, propertyKey: string): json.PropMetadata<any> {
    const propMeta = getPropertyMetadata(target, propertyKey);
    if (!propMeta) {
        throw new json.BindError(`property info has wrong type or missing`);
    }

    return propMeta;
}

export function mustGetObjectMetadata(target: Object): json.ObjectMetadata {
    const objMeta = getObjectMetadata(target);
    if (!objMeta) {
        throw new json.BindError(`object metadata for class "${target.constructor.name}" has wrong type or missing`);
    }

    return objMeta;
}

export function mustGetObjectProperties(target: Object): Set<string> {
    const objMeta = mustGetObjectMetadata(target);
    if (!objMeta.props) {
        throw new json.BindError(`property set for class "${target.constructor.name}" is missing`);
    }

    return objMeta.props;
}

export function mustGetConstructorByTag(target: Object, tag: string): json.EmptyConstructor<Object> {
    const objMeta = mustGetObjectMetadata(target);
    const ctr = objMeta.ctrs?.get(tag);
    if (!ctr) {
        throw new json.BindError(`no class assosiated with tag: "${tag}"`);
    }

    return ctr;
}