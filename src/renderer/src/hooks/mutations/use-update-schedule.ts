import { NewSchedule, Schedule } from '../../../../shared/types';
import { getAppConfigProperty } from '../../lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateSchedule = () => {
  const activeProfileScheduleId = getAppConfigProperty('activeProfileSchedule');
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<NewSchedule> & { id: Schedule['id'] }) =>
      await window.services.schedules.update(data.id, data),
    onMutate: async (schedule) => {
      await queryClient.cancelQueries({
        queryKey: ['schedule', activeProfileScheduleId],
      });
      const previousSchedules = queryClient.getQueryData([
        'schedule',
        activeProfileScheduleId,
      ]);
      queryClient.setQueryData(
        ['schedule', activeProfileScheduleId],
        (oldSchedules: Schedule[]) =>
          oldSchedules.map((oldSchedule) => {
            if (oldSchedule.id === schedule.id) {
              return { ...oldSchedule, isActive: schedule.isActive };
            }
            return oldSchedule;
          }),
      );
      return { previousSchedules };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(
        ['schedule', activeProfileScheduleId],
        context?.previousSchedules,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['schedule', activeProfileScheduleId],
      });
    },
  });
};
