import * as app from 'application/index';
import * as config from 'config/index';
import * as loaders from 'loaders/index';
import * as valid from 'validators/index';
import * as schema from 'schema/index';
import * as video from 'video/index';
import * as display from 'display/index';

export function createApp(): app.Application {
    return new ApplicationImpl();
}

class ApplicationImpl
implements app.Application {
    private _loaderService: loaders.Service;
    private _validatorService: valid.Service;
    root: HTMLDivElement;
    videoService: video.Service;
    displayService: display.Service;

    constructor() {
        this._loaderService = new loaders.Service(config.paths);

        this.assembleValidatorService();
        this.assembleVideoService();
        this.assembleDisplayService();
    }

    private assembleValidatorService() {
        const schemaLoader = new schema.Loader(this._loaderService);

        const schemaCollector = new schema.Collector(schemaLoader, config.schemaConfig).collect();
        const typeValidatorCollector = new valid.type.Collector(config.typeValidatorConfig).collect();

        this._validatorService = new valid.Service(
            typeValidatorCollector.storage,
            schemaCollector.storage
        );
    }

    private assembleVideoService() {
        const videoLoader = new loaders.VideoLoaderImpl(
            this._loaderService,
            this._validatorService
        );

        this.videoService = new video.Service(videoLoader);
    }

    private assembleDisplayService() {
        this.root = document.querySelector('#root');
        this.displayService = new display.Service(this.root);
    }
}