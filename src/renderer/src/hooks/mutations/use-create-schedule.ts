import { NewSchedule } from '../../../../shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: NewSchedule) =>
      await window.services.schedules.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedule'] });
    },
  });
};
