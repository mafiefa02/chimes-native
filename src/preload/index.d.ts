import { IServices } from './types';
import { ElectronAPI } from '@electron-toolkit/preload';
import EventEmitter from 'events';

declare global {
  interface Window {
    electron: ElectronAPI;
    services: IServices;
    appConfigEmitter: EventEmitter;
  }
}
