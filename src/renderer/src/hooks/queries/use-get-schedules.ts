import { Schedule } from '../../../../shared/types';
import { queryKeys } from '../../lib/query-keys';
import { getAppConfigProperty } from '../../lib/utils';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { differenceInWeeks, getDay, isSameDay, startOfDay } from 'date-fns';

const filterActiveSchedules = (schedule: Schedule, date: Date): boolean => {
  const normalizedDate = startOfDay(date);
  const repeatStart = startOfDay(schedule.repeatStart);
  const repeatEnd = schedule.repeatEnd ? startOfDay(schedule.repeatEnd) : null;

  if (schedule.repeat === 'once') return isSameDay(repeatStart, normalizedDate);

  if (normalizedDate < repeatStart) return false;

  if (repeatEnd && normalizedDate > repeatEnd) return false;

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

export const useGetSchedules = (date: Date | undefined = new Date()) => {
  const activeProfileScheduleId = getAppConfigProperty('activeProfileSchedule');
  return useQuery({
    enabled: !!activeProfileScheduleId,
    placeholderData: keepPreviousData,
    queryKey: queryKeys.schedules.all(date),
    queryFn: async () =>
      await window.services.schedules
        .getByProfile(activeProfileScheduleId)
        .then((schedules) =>
          schedules.filter((schedule) => filterActiveSchedules(schedule, date)),
        ),
  });
};
