import pkg from '../../package.json';
import { capitalize } from './utils';

export const ENTRY_COMPONENT_ID = 'root';
export const APP_NAME = capitalize(pkg.name);
export const APP_ID = pkg.config.appId;
