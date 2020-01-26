import * as fs from 'fs';

export class FileLoader {
    public loadFile(filepath: string): Buffer {
        try {
            return fs.readFileSync(filepath);
        } catch(e) {
            console.log(`file loading error: ${e}`);
            return null;
        }
    }

    public loadJson(filepath: string): Object {
        const buffer = this.loadFile(filepath);
        if (!buffer) {
            return null;
        }
        return this.parseJson(buffer);
    }

    private parseJson(buffer: Buffer): Object {
        try {
            return JSON.parse(buffer.toString());
        } catch(e) {
            console.log(`json parsing error: ${e}`);
            return null;
        }
    }
}