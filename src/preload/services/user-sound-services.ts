import { Services } from '../types';
import { ipcRenderer } from 'electron/renderer';

export const userSoundServices = {
  getByUser: (userId) => ipcRenderer.invoke('userSounds:getByUser', userId),
  getBySoundId: (userId, soundId) =>
    ipcRenderer.invoke('userSounds:getBySoundId', userId, soundId),
  create: (data) => ipcRenderer.invoke('userSounds:create', data),
  update: (id, userId, data) =>
    ipcRenderer.invoke('userSounds:update', id, userId, data),
  delete: (id, userId) => ipcRenderer.invoke('userSounds:delete', id, userId),
} satisfies Services['userSound'];
