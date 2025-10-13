import { Services } from '../types';
import { ipcRenderer } from 'electron/renderer';

const listeners = new Map<string, Set<(newValue: any) => void>>();

/**
 * Listen for configuration changes from the main process.
 * This acts as a central dispatcher, receiving all configuration change events
 * and forwarding them to the appropriate renderer-side callbacks registered
 * for a specific configuration key.
 */
ipcRenderer.on('appConfig:changed', (_event, changedKey, newValue) => {
  const callbacks = listeners.get(changedKey);
  if (callbacks) {
    callbacks.forEach((callback) => {
      try {
        callback(newValue);
      } catch (e) {
        console.error('Error in appConfig:changed callback', e);
      }
    });
  }
});

export const appConfigServices = {
  get: (key) => ipcRenderer.sendSync('appConfig:getSync', key),
  set: (key, value) => ipcRenderer.send('appConfig:set', key, value),
  onChange: (key, callback) => {
    let callbacks = listeners.get(key);
    if (!callbacks) {
      callbacks = new Set();
      listeners.set(key, callbacks);
    }
    callbacks.add(callback);

    return () => {
      const currentCallbacks = listeners.get(key);
      if (currentCallbacks) {
        currentCallbacks.delete(callback);
        if (currentCallbacks.size === 0) {
          listeners.delete(key);
        }
      }
    };
  },
} satisfies Services['appConfig'];
