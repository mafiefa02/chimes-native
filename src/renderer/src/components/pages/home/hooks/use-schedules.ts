import { Schedule } from '../../../../../../shared/types';
import { useUpdateSchedule } from '../../../../hooks/mutations/use-update-schedule';
import { useGetSchedules } from '../../../../hooks/queries/use-get-schedules';
import { useMinuteTime } from '../../../../hooks/use-minute-time';
import { parseDateStringAsUTC } from '../../../../lib/utils';
import { isAfter, isBefore, isFuture, isPast, isToday } from 'date-fns';
import { useMemo } from 'react';

export const useSchedules = (date: Date) => {
  const { data: schedules, isPending, isError } = useGetSchedules(date);
  const { mutate: updateSchedule } = useUpdateSchedule(date);
  const { time: now } = useMinuteTime();

  const onToggle = (id: Schedule['id'], newIsActive: Schedule['isActive']) => {
    updateSchedule({ id, isActive: newIsActive });
  };

  const processedSchedules = useMemo(() => {
    if (!schedules || !now) return [];

    const upcomingSchedule = schedules.reduce<Schedule | null>(
      (earliest, current) => {
        const currentTime = parseDateStringAsUTC(current.triggerTime, 'HH:mm');

        // Skip if the current schedule isn't a candidate
        if (!current.isActive || !isAfter(currentTime, now)) return earliest;

        // If this is the first valid schedule we've found, it's the earliest so far
        if (!earliest) return current;

        // Otherwise, compare with the earliest found so far
        const earliestTime = parseDateStringAsUTC(
          earliest.triggerTime,
          'HH:mm',
        );

        return isBefore(currentTime, earliestTime) ? current : earliest;
      },
      null,
    );

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
