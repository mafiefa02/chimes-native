import { Services } from '../types';
import { ipcRenderer } from 'electron/renderer';

export const scheduleProfileServices = {
  getByUser: (userId) =>
    ipcRenderer.invoke('scheduleProfiles:getByUser', userId),
  create: (data) => ipcRenderer.invoke('scheduleProfiles:create', data),
  update: (id, data) => ipcRenderer.invoke('scheduleProfiles:update', id, data),
  delete: (id) => ipcRenderer.invoke('scheduleProfiles:delete', id),
} satisfies Services['scheduleProfile'];
