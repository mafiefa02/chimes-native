import { Schedule } from './types';
import { getISODay, isSameDay, startOfDay } from 'date-fns';
import fs from 'fs';
import path from 'path';

export const isDev = process.env.NODE_ENV === 'development';

export const ensureDirExists = (filePath: string) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return filePath;
};

export const capitalize = (sentence: string) => {
  if (!sentence) return '';
  return sentence
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const filterActiveSchedules = (
  schedule: Schedule,
  date: Date,
): boolean => {
  const normalizedDate = startOfDay(date);
  const repeatStart = startOfDay(schedule.repeatStart);
  if (schedule.repeat === 'once') return isSameDay(repeatStart, normalizedDate);
  if (normalizedDate < repeatStart) return false;

  const repeatEnd = schedule.repeatEnd ? startOfDay(schedule.repeatEnd) : null;
  if (repeatEnd && normalizedDate > repeatEnd) return false;

  const dayOfWeek = getISODay(normalizedDate);
  if (!schedule.triggerDays.includes(dayOfWeek)) return false;

  return true;
};
