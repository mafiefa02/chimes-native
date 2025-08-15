import { IServices } from '../lib/types';
import { ipcRenderer } from 'electron/renderer';

export const services: IServices = {
  profiles: { getAll: () => ipcRenderer.invoke('profiles:getAll') },
};
