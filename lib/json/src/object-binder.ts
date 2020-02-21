import * as json from '../pkg';

export const objectBinder = new class {
    private _jsonObject: Object;
    private _meta: json.PropMetadata;

    public bind(jsonObject: Object, meta: json.PropMetadata): Object {
        this._jsonObject = jsonObject;
        this._meta = meta;

        return this.innerBind();
    }

    private innerBind(): Object {
        const tag = this._jsonObject[json.settings.tagKey];
        if (tag != null) {
            return this.bindDerived(tag);
        }

        return this.bindOrdinary();
    }

    private bindOrdinary(): Object {
        return this.callBind(this._meta.getCtr());
    }

    private bindDerived(tag: string): Object {
        if (typeof(tag) !== 'string') {
            throw new json.WrongTagTypeError();
        }

        return this.callBind(json.meta.mustGetCtrByTag(this._meta.getCtr(), tag));
    }

    private callBind(ctr: json.Constructor) {
        return json.bind(this._jsonObject, ctr);
    }
}