import * as schema from 'schema/index';

type ValidationResult = {
    ok: boolean,
    cache?: schema.Schema,
}

export class Validator {
    public validate(obj: Object): ValidationResult {
        if (!obj['id']) {
            return { ok: false };
        }
        if (!obj['type']) {
            return { ok: false };
        }
        if (!this.validateProperties(obj['props'])) {
            return { ok: false };
        }

        return {
            ok: true,
            cache: {
                id: obj['id'],
                type: obj['type'],
                props: obj['props'],
            }
        }
    }

    private validateProperties(props: Object): boolean {
        const entries = Object.entries(props);
        const n = entries.length;
        for (let i = 0; i < n; ++i) {
            const value: Object = entries[i][1];
            if (typeof(value) !== 'object') {
                return false;
            }
            if (!value.hasOwnProperty('required')) {
                return false;
            }
            if (!value.hasOwnProperty('default') && value['required'] === false) {
                return false;
            }
            if (!this.validateTypes(value['types'])) {
                return false;
            }
        }

        return true;
    }

    private validateTypes(types: Object): boolean {
        if (!(types instanceof Array)) {
            return false;
        }

        const n = types.length;
        for (let i = 0; i < n; ++i) {
            if (typeof(types[i]) !== 'string') {
                return false;
            }
        }

        return true;
    }
}