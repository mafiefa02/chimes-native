import { UserSound } from '../../../../shared/types';
import { getAppConfigProperty } from '../../lib/utils';
import { useQuery } from '@tanstack/react-query';

export const useGetSoundById = (id: UserSound['id']) => {
  const userProfileId = getAppConfigProperty('activeProfile');
  return useQuery({
    queryKey: ['sounds', id],
    queryFn: async () =>
      await window.services.userSounds.getBySoundId(userProfileId, id),
  });
};
