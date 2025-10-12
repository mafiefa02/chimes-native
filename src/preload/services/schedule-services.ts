import { Services } from '../types';
import { ipcRenderer } from 'electron/renderer';

export const scheduleServices = {
  getByProfile: (profileId) =>
    ipcRenderer.invoke('schedules:getByProfile', profileId),
  create: (data) => ipcRenderer.invoke('schedules:create', data),
  update: (id, data) => ipcRenderer.invoke('schedules:update', id, data),
  delete: (id) => ipcRenderer.invoke('schedules:delete', id),
} satisfies Services['schedule'];
