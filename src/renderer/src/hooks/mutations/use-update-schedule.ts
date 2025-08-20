import { NewSchedule, Schedule } from '../../../../shared/types';
import { queryKeys } from '../../lib/query-keys';
import { tz } from '@date-fns/tz';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format, parse } from 'date-fns';

export const useUpdateSchedule = (date: Date) => {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.schedules.all(date);

  return useMutation({
    mutationFn: async (data: Partial<NewSchedule> & { id: Schedule['id'] }) =>
      await window.services.schedules.update(data.id, {
        ...data,
        triggerTime: data.triggerTime
          ? format(parse(data.triggerTime, 'HH:mm', new Date()), 'HH:mm', {
              in: tz('Etc/UTC'),
            })
          : undefined,
      }),
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
    onError: (_err, _newTodo, context) =>
      queryClient.setQueryData(queryKey, context?.previousSchedules),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKey }),
  });
};
