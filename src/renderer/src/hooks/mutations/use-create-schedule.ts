import { NewSchedule } from '../../../../shared/types';
import { queryKeys } from '../../lib/query-keys';
import { useAppConfig } from '../use-app-config';
import { tz } from '@date-fns/tz';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format, parse } from 'date-fns';

export const useCreateSchedule = (date: Date = new Date()) => {
  const activeProfileScheduleId = useAppConfig('activeProfileSchedule');
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: NewSchedule) => {
      console.log({
        ...data,
        triggerTime: format(
          parse(data.triggerTime, 'HH:mm', new Date()),
          'HH:mm',
          { in: tz('Etc/UTC') },
        ),
      });
      return await window.services.schedules.create({
        ...data,
        triggerTime: format(
          parse(data.triggerTime, 'HH:mm', new Date()),
          'HH:mm',
          { in: tz('Etc/UTC') },
        ),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.schedules({
          date,
          profileId: activeProfileScheduleId,
        }),
      });
    },
  });
};
