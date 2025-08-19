import { getAppConfigProperty } from '../../lib/utils';
import { useQuery } from '@tanstack/react-query';

export const useGetSounds = () => {
  const userProfileId = getAppConfigProperty('activeProfile');
  return useQuery({
    queryKey: ['sounds'],
    queryFn: async () =>
      await window.services.userSounds.getByUser(userProfileId),
  });
};
