import * as video from 'video/index';

export class Engine {
    private _service: video.Service;
    private _current: video.Clip[];
    private _isActive: boolean;

    constructor(service: video.Service) {
        this._service = service;
        this._current = [];
    }

    public play() {
        this._current.forEach(clip => {
            clip.play();
        });
        this._isActive = true;
    }

    public pause() {
        this._current.forEach(clip => {
            clip.pause();
        });
        this._isActive = false;
    }

    public addClip(clip: video.Clip) {
        if (this._isActive) clip.play();
        this._current.push(clip);
    }

    public replaceClip(clip: video.Clip) {
        if (this._isActive) clip.play();

        this.releaseCurrent();
        this._current.push(clip);
    }

    private releaseCurrent() {
        this._current.forEach(clip => {
            this._service.releaseResource(clip.name);
        });
        this._current = [];
    }
}