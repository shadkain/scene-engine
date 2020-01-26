import * as video from 'video/index';

export class Engine {
    private _service: video.Service;
    private _current: video.Clip;
    private _isPlaying: boolean;

    constructor(service: video.Service) {
        this._service = service;
    }

    public play() {
        this._current.play();

        this._isPlaying = true;
    }

    public pause() {
        this._current.play();

        this._isPlaying = false;
    }

    public setClip(clip: video.Clip) {
        const prevClip = this._current;
        this._current = clip;

        if (this._isPlaying) this.play();

        this._service.releaseResource(prevClip.name);
    }
}