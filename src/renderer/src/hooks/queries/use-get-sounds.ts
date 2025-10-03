import { queryKeys } from '../../lib/query-keys';
import { useAppConfig } from '../use-app-config';
import { useQuery } from '@tanstack/react-query';

export const useGetSounds = () => {
  const userProfileId = useAppConfig('activeProfile');
  return useQuery({
    queryKey: queryKeys.sounds({}),
    queryFn: async () =>
      await window.services.userSound.getByUser(userProfileId),
  });
};
