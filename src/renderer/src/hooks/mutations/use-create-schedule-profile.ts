import { NewScheduleProfile } from '../../../../shared/types';
import { queryKeys } from '../../lib/query-keys';
import { getAppConfigProperty } from '../../lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateScheduleProfile = () => {
  const queryClient = useQueryClient();
  const userId = getAppConfigProperty('activeProfile');
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
