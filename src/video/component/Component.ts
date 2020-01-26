import * as video from 'video/index';

export class Component {
    private _timeline: video.Timeline;
    readonly service: video.Service;
    readonly info: video.Info;
    
    constructor(service: video.Service, info: video.Info) {
        this.service = service;
        this.info = info;

        this._timeline = new video.Timeline();
    }

    public init() {
        const assembler = new video.ComponentAssembler(this, this._timeline);
        assembler.assemble();
    }

    public begin() {
        this.emit(video.Moment.begin);
    }

    public emit(frame: number) {
        this._timeline.emit(frame);
    }

    public end() {
        this.emit(video.Moment.end);
    }

    public destroy() {
        this._timeline.emit(video.Moment.destroy);
        this._timeline.clear();
    }
}