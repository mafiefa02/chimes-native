import { app } from 'electron';
import path from 'path';

const userData = app.getPath('userData');
export const defaultSoundFile = 'bell.mp3';
export const appConfigPath = path.join(userData, 'config.json');
