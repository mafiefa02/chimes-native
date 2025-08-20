import { NewSchedule, Schedule } from '../../../../shared/types';
import { queryKeys } from '../../lib/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateSchedule = (date: Date) => {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.schedules.all(date);

  return useMutation({
    mutationFn: async (data: Partial<NewSchedule> & { id: Schedule['id'] }) =>
      await window.services.schedules.update(data.id, data),
    onMutate: async (schedule) => {
      await queryClient.cancelQueries({ queryKey });
      const previousSchedules = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (oldSchedules: Schedule[]) => {
        if (!oldSchedules) return [];
        return oldSchedules.map((oldSchedule) => {
          if (oldSchedule.id === schedule.id) {
            return { ...oldSchedule, isActive: schedule.isActive };
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
