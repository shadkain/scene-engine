import * as config from 'config/index';
import * as loaders from 'loaders/index';
import * as valid from 'validators/index';
import * as schema from 'schema/index';
import * as video from 'video/index';

export class Application {
    readonly videoService: video.Service;

    constructor() {
        const loaderService = new loaders.Service(config.paths);
        const schemaLoader = new schema.Loader(loaderService);

        const schemaCollector = new schema.Collector(schemaLoader, config.schemaConfig);
        schemaCollector.collect();

        const typeValidatorCollector = new valid.type.Collector(config.typeValidatorConfig);
        typeValidatorCollector.collect();

        const validatorService = new valid.Service(
            typeValidatorCollector.storage,
            schemaCollector.storage
        );

        const videoLoader = new loaders.VideoLoaderImpl(
            loaderService,
            validatorService
        );

        this.videoService = new video.Service(videoLoader);
    }
}