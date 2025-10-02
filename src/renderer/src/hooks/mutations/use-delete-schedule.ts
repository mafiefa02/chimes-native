import { Schedule } from '../../../../shared/types';
import { queryKeys } from '../../lib/query-keys';
import { getAppConfigProperty } from '../../lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDeleteSchedule = (id: Schedule['id'], date: Date) => {
  const activeProfileScheduleId = getAppConfigProperty('activeProfileSchedule');
  const queryClient = useQueryClient();
  const queryKey = queryKeys.schedules({
    date,
    profileId: activeProfileScheduleId,
  });
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
    onError: (_, __, ctx) =>
      queryClient.setQueryData(queryKey, ctx?.previousSchedules),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKey }),
  });
};
