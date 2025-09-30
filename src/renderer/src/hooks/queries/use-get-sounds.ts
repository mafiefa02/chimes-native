import { queryKeys } from '../../lib/query-keys';
import { getAppConfigProperty } from '../../lib/utils';
import { useQuery } from '@tanstack/react-query';

export const useGetSounds = () => {
  const userProfileId = getAppConfigProperty('activeProfile');
  return useQuery({
    queryKey: queryKeys.sounds({}),
    queryFn: async () =>
      await window.services.userSounds.getByUser(userProfileId),
  });
};
