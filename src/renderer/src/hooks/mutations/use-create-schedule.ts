import { NewSchedule } from '../../../../shared/types';
import { queryKeys } from '../../lib/query-keys';
import { tz } from '@date-fns/tz';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format, parse } from 'date-fns';

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: NewSchedule) =>
      await window.services.schedules.create({
        ...data,
        triggerTime: format(
          parse(data.triggerTime, 'HH:mm', new Date()),
          'HH:mm',
          { in: tz('Etc/UTC') },
        ),
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.schedules.all(data[0].repeatStart),
      });
    },
  });
};
