import * as video from 'video/index';

export class Engine {
    private _active: video.Component;
    private _clip: video.Clip;
    private _rafId: number;
    private _last: number;

    constructor() {
        this._clip = new video.Clip(, 25);
        this._clip.element.className = 'video';
        document.querySelector('#root').appendChild(this._clip.element);
    }

    public play() {
        this._clip.element.play();
        var self = this;
        this._rafId = requestAnimationFrame(function f() {
            const frame = self._clip.frame;
            if (frame > self._last) {
                self._active.emit(frame);
                self._last = frame;
            }

            self._rafId = requestAnimationFrame(f);
        });
    }

    public pause() {
        this._clip.element.pause();
        cancelAnimationFrame(this._rafId);
    }

    public setActiveVideo(entry: video.StorageEntry) {
        if (this._active) {
            this._active.reset();
        }
        this._last = -1;

        const newClip = new video.Clip(document.createElement('video'), entry.component.info.fps);
        newClip.element.className = 'video';
        newClip.element.src = entry.resource.url;
        newClip.element.play();

        this._clip.element.replaceWith(newClip.element);
        this._clip = newClip;

        this._active = entry.component;
        this._active.prepare();
        this._active.start();

        this._clip.element.addEventListener('ended', this._active.finish.bind(this._active));
    }
}