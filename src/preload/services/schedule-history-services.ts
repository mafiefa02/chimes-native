import { IServices } from '../types';
import { ipcRenderer } from 'electron/renderer';

export const scheduleHistoryServices = {
  getBySchedule: (scheduleId) =>
    ipcRenderer.invoke('scheduleHistory:getBySchedule', scheduleId),
  create: (data) => ipcRenderer.invoke('scheduleHistory:create', data),
} satisfies IServices['scheduleHistory'];
