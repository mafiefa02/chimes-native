import { Schedule } from '../../../../shared/types';
import { useUpdateSchedule } from '../../hooks/mutations/use-update-schedule';
import { useGetActiveSchedules } from '../../hooks/queries/use-get-active-schedules';
import { useMinuteTime } from '../../hooks/use-minute-time';
import { useScheduleDate } from '../../hooks/use-schedule-date';
import { findUpcomingSchedule, parseDateStringAsUTC } from '../../lib/utils';
import { isBefore, isPast, isToday } from 'date-fns';
import { useMemo } from 'react';

export const useSchedules = () => {
  const { date } = useScheduleDate();
  const {
    data: schedules,
    isPending,
    isError,
  } = useGetActiveSchedules({ date });
  const { mutate: updateSchedule } = useUpdateSchedule(date);
  const { time: now } = useMinuteTime();

  const onToggle = (id: Schedule['id'], newIsActive: Schedule['isActive']) => {
    updateSchedule({ id, isActive: newIsActive });
  };

  const upcomingSchedule = useMemo(
    () => findUpcomingSchedule(now, schedules),
    [schedules, now],
  );

  const isUpcomingSchedule = (schedule: Schedule) =>
    upcomingSchedule?.id === schedule.id;

  const isSchedulePast = (schedule: Schedule) =>
    isToday(date)
      ? isBefore(parseDateStringAsUTC(schedule.triggerTime, 'HH:mm'), now)
      : isPast(date);

  const availableSchedules = !schedules || !now ? [] : schedules;

  return {
    schedules: availableSchedules,
    isPending,
    isError,
    onToggle,
    isUpcomingSchedule,
    isSchedulePast,
  };
};
