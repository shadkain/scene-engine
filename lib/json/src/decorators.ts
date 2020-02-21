import * as json from '../pkg';

/**
 * Function-decorator used to bind class and json properties.
 * @param iPropMeta Json property metadata.
 */
export function prop(iPropMeta: json.IPropMetadata) {
    const propMeta = new json.PropMetadata(iPropMeta);

    return (target: json.Prototype, propertyKey: string) => {
        const objectMeta = json.meta.getOrCreate(target.constructor as json.Constructor);
        objectMeta.setPropMetadata(propertyKey, propMeta);
    }
}

/**
 * Function-decorator used to extend and declare derived class via string tag.
 * @param iDerivedMeta Json derived class metadata.
 */
export function extend<B, D extends B>(iDerivedMeta: json.IDerivedMetadata<B>) {
    return (target: json.Constructor<D>) => {
        const baseMeta = json.meta.getOrCreate(iDerivedMeta.base);
        baseMeta.setDerivedCtr(iDerivedMeta.tag, target);

        const derivedMeta = json.meta.getOrCreate(target);
        derivedMeta.base = iDerivedMeta.base;
    }
}

/**
 * Function-decorator used to declare abstract class.
 * Trying to bind to abstract class will cause `json.Error`.
 */
export function abstract() {
    return (target: json.Constructor) => {
        const objectMeta = json.meta.getOrCreate(target);
        objectMeta.abstract = true;
    }
}