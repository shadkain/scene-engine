import { Application } from 'application/index';
import * as video from 'video/index';

const app = new Application();

Object.defineProperty(window, 'app', { value: app });
Object.defineProperty(window, 'Component', { value: video.Component });