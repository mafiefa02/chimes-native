import { AppConfig, Schedule } from '../../../shared/types';
import { tz } from '@date-fns/tz';
import { clsx, type ClassValue } from 'clsx';
import { format, isAfter, isBefore, parse } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getAppConfigProperty = <K extends keyof AppConfig>(key: K) =>
  window.services.appConfig.get(key);

export const parseDateStringAsUTC = (dateString: string, dateFormat: string) =>
  parse(dateString, dateFormat, new Date(), { in: tz('Etc/UTC') });

export const formatDateToLocalTimezone = (date: Date, dateFormat: string) =>
  format(date, dateFormat, { in: tz(getAppConfigProperty('userTimezone')) });

export const findUpcomingSchedule = (
  reference: Date,
  schedules?: Schedule[],
) => {
  if (!schedules) return null;
  return schedules.reduce<Schedule | null>((earliest, current) => {
    const currentTime = parseDateStringAsUTC(current.triggerTime, 'HH:mm');

    if (!current.isActive || !isAfter(currentTime, reference)) return earliest;
    if (!earliest) return current;

    const earliestTime = parseDateStringAsUTC(earliest.triggerTime, 'HH:mm');

    return isBefore(currentTime, earliestTime) ? current : earliest;
  }, null);
};
