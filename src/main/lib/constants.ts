import { APP_NAME } from '../../shared/contants';
import { getAppConfigPath, getDbPath } from '../../shared/utils';
import { app } from 'electron';
import path from 'path';

export const appDataPath = path.join(app.getPath('appData'), APP_NAME);
export const dbPath = getDbPath(appDataPath);
export const appConfigPath = getAppConfigPath(appDataPath);
