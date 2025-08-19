import { AppConfig } from '../../../shared/types';
import { tz } from '@date-fns/tz';
import { clsx, type ClassValue } from 'clsx';
import { format, parse } from 'date-fns';
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
