import * as bind from 'bind/index';
import * as video from 'video/index';

const enum KeyWords {
    begin = 'begin',
    end = 'end',
}

export class FrameTimecodeBinder
implements bind.type.Binder {
    private _fps: number;

    constructor(fps: number) {
        this._fps = fps;
    }

    get fps(): number {
        return this._fps;
    }

    set fps(value: number) {
        this._fps = value;
    }

    public bind(data: any): bind.Result {
        if (typeof(data) !== 'string') {
            return { ok: false };
        }

        const parts = data.split(':');
        if (parts.length !== 3) {
            return this.checkKeywords(data);
        }

        const
            min = Number(parts[0]),
            sec = Number(parts[1]),
            frames = Number(parts[2]);
        
        if (!this.validateParsed(min, sec, frames)) {
            return { ok: false };
        }
        
        return { 
            ok: true,
            cache: (min * 60 + sec) * this._fps + frames,
        };
    }

    private validateParsed(min: number, sec: number, frames: number): boolean {
        return this.isCorrect(min) && this.isCorrect(sec) && this.isCorrect(frames) && frames < this._fps;
    }

    private isCorrect(value: number) {
        return Number.isInteger(value) && value >= 0;
    }

    private checkKeywords(data: string): bind.Result {
        switch (data) {
            case KeyWords.begin:
                return {
                    ok: true,
                    cache: video.Moment.begin
                };

            case KeyWords.end:
                return {
                    ok: true,
                    cache: video.Moment.end
                };
                
            default:
                return { ok: false };
        }
    }
}