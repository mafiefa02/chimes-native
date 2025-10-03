import { UserSound } from '../../../../shared/types';
import { queryKeys } from '../../lib/query-keys';
import { useAppConfig } from '../use-app-config';
import { useQuery } from '@tanstack/react-query';

export const useGetSoundById = (id: UserSound['id']) => {
  const userProfileId = useAppConfig('activeProfile');
  return useQuery({
    queryKey: queryKeys.sounds({ id }),
    queryFn: async () =>
      await window.services.userSound.getBySoundId(userProfileId, id),
  });
};
