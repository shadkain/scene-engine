import * as loaders from 'loaders/index';
import * as valid from 'validators/index';
import * as video from 'video/index';

export class VideoLoaderImpl
implements video.Loader {
    private _loaderService: loaders.Service;
    private _validatorService: valid.Service;

    constructor(loaderService: loaders.Service, validatorService: valid.Service) {
        this._loaderService = loaderService;
        this._validatorService = validatorService;
    }

    public load(name: string): video.ResourceInfoPair {
        const info = this.loadInfo(name);
        if (!info) {
            return null;
        }
        const resource = this.loadResource(info);
        if (!resource) {
            return null;
        }

        return {
            info: info,
            resource: resource,
        };
    }

    public loadInfo(name: string): video.Info {
        const obj = this._loaderService.loadVideoDescription(name);
        if (!obj) {
            console.log(`video info "${name}" loading error`);
            return null;
        }

        const vr = this._validatorService.validateVideo(obj);
        if (!vr.ok) {
            console.log(`video info "${name}" validation error`);
            return null;
        }

        return vr.cache;
    }

    public loadResource(info: video.Info): video.Resource {
        const buffer = this._loaderService.loadVideo(info.name, info.format);
        if (!buffer) {
            console.log(`video resource "${name}" loading error`);
            return null;
        }

        return new video.Resource(buffer);
    }
}