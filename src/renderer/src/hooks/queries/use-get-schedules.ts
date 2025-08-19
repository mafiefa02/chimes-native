import { Schedule } from '../../../../shared/types';
import { getAppConfigProperty } from '../../lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getDay, isSameDay, isWithinInterval } from 'date-fns';

const filterActiveSchedules = (schedule: Schedule, date: Date) => {
  if (schedule.repeat === 'once') return isSameDay(schedule.repeatStart, date);

  const dayOfWeek = getDay(date);
  if (!schedule.triggerDays.includes(dayOfWeek)) return false;

  const repeatStart = schedule.repeatStart;
  const repeatEnd = schedule.repeatEnd;

  if (repeatEnd) {
    return isWithinInterval(date, { start: repeatStart, end: repeatEnd });
  } else {
    return date >= repeatStart;
  }
};

export const useGetSchedules = (date: Date | undefined = new Date()) => {
  const activeProfileScheduleId = getAppConfigProperty('activeProfileSchedule');
  return useQuery({
    enabled: !!activeProfileScheduleId,
    queryKey: ['schedule', activeProfileScheduleId, date],
    queryFn: async () =>
      await window.services.schedules
        .getByProfile(activeProfileScheduleId)
        .then((schedules) =>
          schedules.filter((schedule) => filterActiveSchedules(schedule, date)),
        ),
  });
};
