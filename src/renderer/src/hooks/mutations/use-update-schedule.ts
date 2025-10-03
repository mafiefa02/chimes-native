import { NewSchedule, Schedule } from '../../../../shared/types';
import { queryKeys } from '../../lib/query-keys';
import { useAppConfig } from '../use-app-config';
import { tz } from '@date-fns/tz';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format, parse } from 'date-fns';

export const useUpdateSchedule = (date: Date = new Date()) => {
  const activeProfileScheduleId = useAppConfig('activeProfileSchedule');
  const queryClient = useQueryClient();
  const queryKey = queryKeys.schedules({
    date,
    profileId: activeProfileScheduleId,
  });

  return useMutation({
    mutationFn: async (data: Partial<NewSchedule> & { id: Schedule['id'] }) => {
      if (!data.triggerTime) {
        return await window.services.schedule.update(data.id, data);
      }

      const parsedTime = parse(data.triggerTime, 'HH:mm', new Date());
      const utcTriggerTime = format(parsedTime, 'HH:mm', { in: tz('Etc/UTC') });

      return await window.services.schedule.update(data.id, {
        ...data,
        triggerTime: utcTriggerTime,
      });
    },
    onMutate: async (schedule) => {
      await queryClient.cancelQueries({ queryKey });
      const previousSchedules = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (oldSchedules: Schedule[] = []) => {
        return oldSchedules.map((oldSchedule) => {
          if (oldSchedule.id === schedule.id) {
            return { ...oldSchedule, ...schedule };
          }
          return oldSchedule;
        });
      });
      return { previousSchedules };
    },
    onError: (_, __, ctx) =>
      queryClient.setQueryData(queryKey, ctx?.previousSchedules),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKey }),
  });
};
