import { Schedule } from '../../../../shared/types';
import { queryKeys } from '../../lib/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDeleteSchedule = (id: Schedule['id'], date: Date) => {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.schedules.all(date);
  return useMutation({
    mutationFn: async () => await window.services.schedules.delete(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousSchedules = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (oldSchedules: Schedule[] = []) =>
        oldSchedules.filter((oldSchedule) => oldSchedule.id !== id),
      );
      return { previousSchedules };
    },
    onSuccess: () => toast.success('Succesfully deleted the schedule'),
    onError: (_err, _newTodo, context) =>
      queryClient.setQueryData(queryKey, context?.previousSchedules),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKey }),
  });
};
