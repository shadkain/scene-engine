import * as json from '../pkg';

export interface DerivedMetadata<T> {
    base: json.EmptyConstructor<T>;
    tag: string;
}

export class ObjectMetadata {
    props?: Set<string>;
    ctrs?: Map<string, json.EmptyConstructor<Object>>;

    public addProp(propKey: string) {
        if (!this.props) this.props = new Set();

        this.props.add(propKey);
    }

    public setCtr(tag: string, ctr: json.EmptyConstructor<Object>) {
        if (!this.ctrs) this.ctrs = new Map();

        this.ctrs.set(tag, ctr);
    }
}