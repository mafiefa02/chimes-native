import { Schedule } from '../../../../../shared/types';
import { useGetWeeklySchedules } from '../../../hooks/queries/use-get-weekly-schedules';
import { useMinuteTime } from '../../../hooks/use-minute-time';
import { findUpcomingSchedule } from '../../../lib/utils';
import { useMemo } from 'react';

interface useWeeklySchedulesProp {
  selectedDay: number;
  searchQuery?: string;
}

export const useWeeklySchedules = ({
  selectedDay,
  searchQuery,
}: useWeeklySchedulesProp) => {
  const {
    data: schedules,
    isPending,
    isError,
  } = useGetWeeklySchedules({ selectedDayOfWeek: selectedDay, searchQuery });

  const { time: now } = useMinuteTime();
  const upcomingSchedule = useMemo(
    () => findUpcomingSchedule(now, schedules),
    [schedules, now],
  );
  const isScheduleUpcoming = (schedule: Schedule) =>
    upcomingSchedule ? schedule.id === upcomingSchedule.id : false;

  return {
    schedules,
    upcomingSchedule,
    isScheduleUpcoming,
    isPending,
    isError,
  };
};
