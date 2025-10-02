import { queryKeys } from '../../lib/query-keys';
import { useAppConfig } from '../use-app-config';
import { useQuery } from '@tanstack/react-query';

export const useGetProfileSchedules = () => {
  const activeProfileId = useAppConfig('activeProfile');
  return useQuery({
    enabled: !!activeProfileId,
    queryKey: queryKeys.profileSchedules(),
    queryFn: async () =>
      await window.services.scheduleProfiles.getByUser(activeProfileId),
  });
};
