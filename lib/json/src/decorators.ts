import * as json from '../pkg';

/**
 * Function-decorator used to bind class and json properties.
 * @param iPropMeta Json property metadata.
 */
export function prop<T>(iPropMeta: json.IPropMetadata<T>) {
    const propMeta = new json.PropMetadata(iPropMeta);

    return (target: Object, propertyKey: string) => {
        const objectInfo = getOrCreateObjectInfo(target);
        objectInfo.addProp(propertyKey);

        json.setPropertyMetadata(propMeta, target, propertyKey);
    }
}

/**
 * Function-decorator used to declare derived class via string tag.
 * @param derivedMeta Json derived class metadata.
 */
export function derived<T>(derivedMeta: json.DerivedMetadata<T>) {
    return (target: json.EmptyConstructor<T>) => {
        const objectMeta = getOrCreateObjectInfo(derivedMeta.base);
        objectMeta.setCtr(derivedMeta.tag, target);
    }
}

function getOrCreateObjectInfo(target: Object): json.ObjectMetadata {
    let objectMeta: json.ObjectMetadata = json.getObjectMetadata(target);
    if (!objectMeta) {
        objectMeta = new json.ObjectMetadata();
        json.setObjectMetadata(objectMeta, target);
    }

    return objectMeta;
}