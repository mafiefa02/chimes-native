import { queryKeys } from '../../lib/query-keys';
import { getAppConfigProperty } from '../../lib/utils';
import { useQuery } from '@tanstack/react-query';

export const useGetProfileSchedules = () => {
  const activeProfileId = getAppConfigProperty('activeProfile');
  return useQuery({
    enabled: !!activeProfileId,
    queryKey: queryKeys.profileSchedules(),
    queryFn: async () =>
      await window.services.scheduleProfiles.getByUser(activeProfileId),
  });
};
