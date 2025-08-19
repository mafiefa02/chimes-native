import { getAppConfigProperty } from '../../lib/utils';
import { useQuery } from '@tanstack/react-query';

export const useGetProfileSchedules = () => {
  const activeProfileId = getAppConfigProperty('activeProfile');
  return useQuery({
    enabled: !!activeProfileId,
    queryKey: ['profile-schedules', activeProfileId],
    queryFn: async () =>
      await window.services.scheduleProfiles.getByUser(activeProfileId),
  });
};
