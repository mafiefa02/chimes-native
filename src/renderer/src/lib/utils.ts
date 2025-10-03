import { AppConfig, Schedule } from '../../../shared/types';
import { tz } from '@date-fns/tz';
import { clsx, type ClassValue } from 'clsx';
import {
  addDays,
  format,
  getISODay,
  isAfter,
  isBefore,
  isEqual,
  max,
  parse,
  startOfDay,
} from 'date-fns';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getAppConfigProperty = <K extends keyof AppConfig>(key: K) =>
  window.services.appConfig.get(key);

export const setAppConfigProperty = <K extends keyof AppConfig>(
  key: K,
  value: AppConfig[K],
) => window.services.appConfig.set(key, value);

export const parseDateStringAsUTC = (
  dateString: string,
  dateFormat: string,
  dateReference: Date = new Date(),
) => parse(dateString, dateFormat, dateReference, { in: tz('Etc/UTC') });

export const formatDateToLocalTimezone = (date: Date, dateFormat: string) =>
  format(date, dateFormat, {
    in: tz(Intl.DateTimeFormat().resolvedOptions().timeZone),
  });

export const getDayName = (dayOfWeek: number, formatDate: string = 'EEEE') => {
  const today = new Date();
  const date = addDays(today, dayOfWeek - today.getDay());

  return format(date, formatDate);
};

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

export const countRemainingOccurrences = (
  schedule: Schedule,
  reference: Date,
): number => {
  if (schedule.repeat === 'once') {
    const triggerDateTime = parseDateStringAsUTC(
      schedule.triggerTime,
      'HH:mm',
      schedule.repeatStart,
    );
    return isAfter(triggerDateTime, reference) ? 1 : 0;
  }

  if (!schedule.repeatEnd) {
    return Infinity;
  }

  const loopStartDate = max([startOfDay(schedule.repeatStart), reference]);

  const scheduleEndDate = schedule.repeatEnd;

  let remainingOccurrences = 0;
  let currentDate = loopStartDate;

  while (
    isBefore(currentDate, scheduleEndDate) ||
    isEqual(startOfDay(currentDate), startOfDay(scheduleEndDate))
  ) {
    const dayOfWeek = getISODay(currentDate);

    if (
      schedule.repeat === 'daily' ||
      schedule.triggerDays.includes(dayOfWeek)
    ) {
      const triggerDateTime = parseDateStringAsUTC(
        schedule.triggerTime,
        'HH:mm',
        currentDate,
      );

      const isFutureOccurrence = isAfter(triggerDateTime, reference);
      const isWithinBounds =
        isBefore(triggerDateTime, scheduleEndDate) ||
        isEqual(triggerDateTime, scheduleEndDate);

      if (isFutureOccurrence && isWithinBounds) {
        remainingOccurrences++;
      }
    }

    currentDate = addDays(currentDate, 1);
  }

  return remainingOccurrences;
};
