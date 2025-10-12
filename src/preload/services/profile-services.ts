import { Services } from '../types';
import { ipcRenderer } from 'electron/renderer';

export const profileServices = {
  getAll: () => ipcRenderer.invoke('profiles:getAll'),
  getById: (id) => ipcRenderer.invoke('profiles:getById', id),
  create: (data) => ipcRenderer.invoke('profiles:create', data),
  update: (id, data) => ipcRenderer.invoke('profiles:update', id, data),
  delete: (id) => ipcRenderer.invoke('profiles:delete', id),
} satisfies Services['profile'];
