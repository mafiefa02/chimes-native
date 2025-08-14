import { ICustomAPI } from './lib/types';
import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: ICustomAPI;
  }
}
