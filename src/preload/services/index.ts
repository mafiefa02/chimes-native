import { IServices } from '../lib/types';
import { ipcRenderer } from 'electron/renderer';

export const services: IServices = {
  appConfig: {
    get: (key) => ipcRenderer.sendSync('appConfig:getSync', key),
    set: (key, value) => ipcRenderer.invoke('appConfig:set', key, value),
  },
  profiles: {
    getAll: () => ipcRenderer.invoke('profiles:getAll'),
    getById: (id) => ipcRenderer.invoke('profiles:getById', id),
    create: (data) => ipcRenderer.invoke('profiles:create', data),
    update: (id, data) => ipcRenderer.invoke('profiles:update', id, data),
    delete: (id) => ipcRenderer.invoke('profiles:delete', id),
  },
  scheduleProfiles: {
    getByUser: (userId) =>
      ipcRenderer.invoke('scheduleProfiles:getByUser', userId),
    create: (data) => ipcRenderer.invoke('scheduleProfiles:create', data),
    update: (id, data) =>
      ipcRenderer.invoke('scheduleProfiles:update', id, data),
    delete: (id) => ipcRenderer.invoke('scheduleProfiles:delete', id),
  },
  userSounds: {
    getByUser: (userId) => ipcRenderer.invoke('userSounds:getByUser', userId),
    create: (data) => ipcRenderer.invoke('userSounds:create', data),
    update: (id, userId, data) =>
      ipcRenderer.invoke('userSounds:update', id, userId, data),
    delete: (id, userId) => ipcRenderer.invoke('userSounds:delete', id, userId),
  },
  schedules: {
    getByProfile: (profileId) =>
      ipcRenderer.invoke('schedules:getByProfile', profileId),
    create: (data) => ipcRenderer.invoke('schedules:create', data),
    update: (id, data) => ipcRenderer.invoke('schedules:update', id, data),
    delete: (id) => ipcRenderer.invoke('schedules:delete', id),
  },
  scheduleHistory: {
    getBySchedule: (scheduleId) =>
      ipcRenderer.invoke('scheduleHistory:getBySchedule', scheduleId),
    create: (data) => ipcRenderer.invoke('scheduleHistory:create', data),
  },
};
