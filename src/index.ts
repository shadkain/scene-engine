import { createApp } from 'application/index';
import * as video from 'video/index';

const app = createApp();

Object.defineProperty(window, 'app', { value: app });
Object.defineProperty(window, 'Component', { value: video.Component });