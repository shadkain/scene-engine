export const settings = new class {
    private _tagKey: string;
    private _autoDetectDerived: boolean;

    set tagKey(key: string) {
        this._tagKey = key;
    }

    get tagKey(): string {
        return this._tagKey;
    }

    set autoDetectDerived(flag: boolean) {
        this._autoDetectDerived = flag;
    }

    get autoDetectDerived(): boolean {
        return this._autoDetectDerived;
    }
}