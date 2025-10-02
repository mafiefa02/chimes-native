import { NewScheduleProfile } from '../../../../shared/types';
import { queryKeys } from '../../lib/query-keys';
import { useAppConfig } from '../use-app-config';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateScheduleProfile = () => {
  const queryClient = useQueryClient();
  const userId = useAppConfig('activeProfile');
  return useMutation({
    mutationFn: async (newProfile: Pick<NewScheduleProfile, 'name'>) => {
      const result = await window.services.scheduleProfiles.create({
        ...newProfile,
        userId,
      });
      return result;
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: queryKeys.profileSchedules(),
      });
    },
  });
};
