import * as path from 'path';
import * as app from 'application/index';

const BASE_PATH = path.resolve(window.__dirname, '..');

const ASSETS_PATH = path.resolve(BASE_PATH, 'assets');
const VIDEO_PATH = path.resolve(ASSETS_PATH, 'video');
const VIDEO_RESOURCE_PATH = path.resolve(VIDEO_PATH, 'resource');
const VIDEO_DESCRIPTION_PATH = path.resolve(VIDEO_PATH, 'info');
const VIDEO_SCHEMA_PATH = path.resolve(VIDEO_PATH, 'schema');

export const paths: app.PathConfig = {
    assets: ASSETS_PATH,
    video: {
        resource: VIDEO_RESOURCE_PATH,
        description: VIDEO_DESCRIPTION_PATH,
        schema: VIDEO_SCHEMA_PATH
    },
}