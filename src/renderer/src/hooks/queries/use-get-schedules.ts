import { Schedule } from '../../../../shared/types';
import { getAppConfigProperty } from '../../lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getDay, isToday, isWithinInterval } from 'date-fns';

const filterActiveSchedules = (schedule: Schedule) => {
  const today = new Date();

  if (schedule.repeat === 'once') return isToday(schedule.repeatStart);

  const dayOfWeek = getDay(today);
  if (!schedule.triggerDays.includes(dayOfWeek)) {
    return false;
  }

  const repeatStart = schedule.repeatStart;
  const repeatEnd = schedule.repeatEnd;

  if (repeatEnd) {
    return isWithinInterval(today, { start: repeatStart, end: repeatEnd });
  } else {
    return today >= repeatStart;
  }
};

export const useGetSchedules = () => {
  const activeProfileScheduleId = getAppConfigProperty('activeProfileSchedule');
  return useQuery({
    enabled: !!activeProfileScheduleId,
    queryKey: ['schedule', activeProfileScheduleId],
    queryFn: async () =>
      await window.services.schedules
        .getByProfile(activeProfileScheduleId)
        .then((schedules) => schedules.filter(filterActiveSchedules)),
  });
};
