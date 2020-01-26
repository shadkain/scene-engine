import * as path from 'path';
import { FileLoader } from 'loaders/index';
import { PathConfig } from 'application/index';

export class Service {
    private _fileLoader: FileLoader;
    private _paths: PathConfig;

    constructor(paths: PathConfig) {
        this._fileLoader = new FileLoader();
        this._paths = paths;
    }

    public loadVideo(name: string, format: string): Buffer {
        return this._fileLoader.loadFile(path.resolve(this._paths.video.resource, `${name}.${format}`));
    }

    public loadVideoDescription(name: string): Object {
        return this._fileLoader.loadJson(path.resolve(this._paths.video.description, `${name}.json`));
    }

    public loadVideoSchema(name: string): Object {
        return this._fileLoader.loadJson(path.resolve(this._paths.video.schema, `${name}.json`));
    }
}