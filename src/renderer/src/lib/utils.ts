import { AppConfig } from '../../../shared/types';
import { clsx, type ClassValue } from 'clsx';
import { format, addMinutes, startOfDay } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getAppConfigProperty = <K extends keyof AppConfig>(key: K) =>
  window.services.appConfig.get(key);

export const minutesToTime = (minutes: number) => {
  if (minutes === null || isNaN(minutes)) return '';
  const date = addMinutes(startOfDay(new Date()), minutes);
  return format(date, 'HH:mm');
};

export const timeToMinutes = (time: string) => {
  if (!time) return 0;
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};
