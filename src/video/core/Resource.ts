export class Resource {
    private _url?: string;
    readonly buffer: Buffer;

    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    get url(): string {
        if (!this._url) {
            this._url = URL.createObjectURL(new Blob([this.buffer]));
        }

        return this._url;
    }

    public destroy() {
        if (this._url) {
            URL.revokeObjectURL(this._url);
            delete this._url;
        }
    }
}