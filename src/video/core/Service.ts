import * as video from 'video/index';

export class Service {
    private _engine: video.Engine;
    private _storageController: video.StorageController;

    constructor(loader: video.Loader) {
        const storage = new video.Storage();
        this._storageController = new video.StorageController(
            this,
            loader,
            storage,
        );

        this._engine = new video.Engine();
    }

    public requestVideo(name: string) {
        if (!this._storageController.retain(name)) {
            console.log(`request for video "${name}" failed`);
        }
    }

    public performTransition(info: video.TransitionActionInfo) {
        const entry = this._storageController.get(info.to);
        this._engine.setActiveVideo(entry);
    }
}