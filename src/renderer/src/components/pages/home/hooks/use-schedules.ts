import { Schedule } from '../../../../../../shared/types';
import { useUpdateSchedule } from '../../../../hooks/mutations/use-update-schedule';
import { useGetSchedules } from '../../../../hooks/queries/use-get-schedules';
import { useTime } from '../../../../hooks/use-time';
import { useMemo } from 'react';

export const useSchedules = () => {
  const { data: schedules, isPending, isError } = useGetSchedules();
  const { mutate: updateSchedule } = useUpdateSchedule();
  const { time: now } = useTime();

  const onToggle = (id: Schedule['id'], newIsActive: Schedule['isActive']) => {
    updateSchedule({ id, isActive: newIsActive });
  };

  const processedSchedules = useMemo(() => {
    if (!schedules || !now) return [];

    const nowInMinutes = now.getHours() * 60 + now.getMinutes();

    const upcomingSchedule = schedules
      .filter((s) => s.triggerTime > nowInMinutes && s.isActive)
      .sort((a, b) => a.triggerTime - b.triggerTime)[0];

    return schedules.map((schedule) => ({
      ...schedule,
      isUpcoming: upcomingSchedule
        ? schedule.id === upcomingSchedule.id
        : false,
      isPast: schedule.triggerTime <= nowInMinutes,
    }));
  }, [schedules, now]);

  return { schedules: processedSchedules, isPending, isError, onToggle };
};
