import { Schedule } from './types';
import { differenceInWeeks, getDay, isSameDay, startOfDay } from 'date-fns';
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
  const repeatEnd = schedule.repeatEnd ? startOfDay(schedule.repeatEnd) : null;

  if (schedule.repeat === 'once') return isSameDay(repeatStart, normalizedDate);

  if (normalizedDate < repeatStart) return false;

  if (repeatEnd && normalizedDate > repeatEnd) return false;

  if (!schedule.isActive) return false;

  const dayOfWeek = getDay(normalizedDate);
  if (!schedule.triggerDays.includes(dayOfWeek)) return false;

  switch (schedule.repeat) {
    case 'daily':
      return true;
    case 'weekly':
      return true;
    case 'biweekly': {
      const weeksDifference = differenceInWeeks(normalizedDate, repeatStart, {
        roundingMethod: 'floor',
      });
      return weeksDifference % 2 === 0;
    }
    case 'monthly':
      return normalizedDate.getDate() === repeatStart.getDate();
    case 'yearly':
      return (
        normalizedDate.getMonth() === repeatStart.getMonth() &&
        normalizedDate.getDate() === repeatStart.getDate()
      );
    default:
      return false;
  }
};
