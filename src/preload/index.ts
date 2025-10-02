import { services } from './services';
import { electronAPI } from '@electron-toolkit/preload';
import { contextBridge } from 'electron';
import { ipcRenderer } from 'electron/renderer';
import EventEmitter from 'events';

// Initialize appConfigEmitter listener once only when the app
// is being launched.
// @ts-ignore (define in dts)
if (!window.appConfigEmitter) {
  // @ts-ignore (define in dts)
  window.appConfigEmitter = new EventEmitter();
  ipcRenderer.on('app-config-changed', (_, updatedKey, value) => {
    // @ts-ignore (define in dts)
    window.appConfigEmitter.emit(updatedKey, value);
  });
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('services', services);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.services = services;
}
