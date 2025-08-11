import pkg from '../../package.json';
import { capitalize } from './utils';

export const APP_NAME = capitalize(pkg.name);
export const APP_ID = pkg.config.appId;
