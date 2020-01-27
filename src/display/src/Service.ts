import * as display from 'display/index';

export class Service {
    private _root: HTMLDivElement;
    private _current: HTMLElement;

    constructor(root: HTMLDivElement) {
        this._root = root;
    }

    public show(element: HTMLElement) {
        if (!this._current) {
            return this.setAndShowCurrent(element);
        }

        this._current.replaceWith(element);
        this._current = element;
    }

    private setAndShowCurrent(element: HTMLElement) {
        this._current = element;
        this._root.appendChild(this._current);
    }
}