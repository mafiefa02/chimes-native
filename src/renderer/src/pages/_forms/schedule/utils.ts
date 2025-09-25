import {
  formatDateToLocalTimezone,
  parseDateStringAsUTC,
} from '../../../lib/utils';
import type { CreateFormSchemaType } from './schema';
import { getDay } from 'date-fns';

export const formatTriggerTime = (triggerTime: string): string =>
  formatDateToLocalTimezone(
    parseDateStringAsUTC(triggerTime, 'HH:mm'),
    'HH:mm',
  );

export const validateTriggerDays = ({
  repeat,
  repeatStart,
}: Pick<CreateFormSchemaType, 'repeat' | 'repeatStart'>): number[] =>
  repeat === 'daily' ? [0, 1, 2, 3, 4, 5, 6] : [getDay(repeatStart)];
