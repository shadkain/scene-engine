export const settings = new class {
    private _tagKey: string;
    private _autoDetectDerived: boolean;

    /**
     * Json property key denoting a tag to determine derived object type.
     */
    get tagKey(): string {
        return this._tagKey;
    }

    set tagKey(key: string) {
        this._tagKey = key;
    }

    /** 
     * Indicates whether enabling autodetecting derived objects by searching for tag key in object.
     */
    get autoDetectDerived(): boolean {
        return this._autoDetectDerived;
    }

    set autoDetectDerived(flag: boolean) {
        this._autoDetectDerived = flag;
    }   
}