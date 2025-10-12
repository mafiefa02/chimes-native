import { AppConfig } from '../../shared/types';
import { Services } from '../types';
import { ipcRenderer } from 'electron/renderer';

export const appConfigServices = {
  get: (key) => ipcRenderer.sendSync('appConfig:getSync', key),
  set: (key, value) => ipcRenderer.invoke('appConfig:set', key, value),
  onChange: (key, callback) => {
    const listener = (value: AppConfig[typeof key]) => callback(value);
    // @ts-ignore (define in dts)
    window.appConfigEmitter.on(key, listener);
    // @ts-ignore (define in dts)
    return () => window.appConfigEmitter.removeListener(key, listener);
  },
} satisfies Services['appConfig'];
