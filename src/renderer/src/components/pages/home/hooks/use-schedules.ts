import { Schedule } from '../../../../../../shared/types';
import { useUpdateSchedule } from '../../../../hooks/mutations/use-update-schedule';
import { useGetSchedules } from '../../../../hooks/queries/use-get-schedules';
import { useTime } from '../../../../hooks/use-time';
import { parseDateStringAsUTC } from '../../../../lib/utils';
import { isAfter, isBefore, isFuture, isPast, isToday } from 'date-fns';
import { useMemo } from 'react';

export const useSchedules = (date: Date) => {
  const { data: schedules, isPending, isError } = useGetSchedules(date);
  const { mutate: updateSchedule } = useUpdateSchedule(date);
  const { time: now } = useTime();

  const onToggle = (id: Schedule['id'], newIsActive: Schedule['isActive']) => {
    updateSchedule({ id, isActive: newIsActive });
  };

  const processedSchedules = useMemo(() => {
    if (!schedules || !now) return [];

    const upcomingSchedule = schedules
      .filter(
        (s) =>
          isAfter(parseDateStringAsUTC(s.triggerTime, 'HH:mm'), now) &&
          s.isActive,
      )
      .sort(
        (a, b) =>
          parseDateStringAsUTC(a.triggerTime, 'HH:mm').getTime() -
          parseDateStringAsUTC(b.triggerTime, 'HH:mm').getTime(),
      )[0];

    return schedules.map((schedule) => ({
      ...schedule,
      isUpcoming: isToday(date)
        ? upcomingSchedule?.id === schedule.id
        : isFuture(date),
      isPast: isToday(date)
        ? isBefore(parseDateStringAsUTC(schedule.triggerTime, 'HH:mm'), now)
        : isPast(date),
    }));
  }, [schedules, now, date]);

  return { schedules: processedSchedules, isPending, isError, onToggle };
};
