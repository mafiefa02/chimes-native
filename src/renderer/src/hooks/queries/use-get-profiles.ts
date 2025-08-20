import { queryKeys } from '../../lib/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useGetProfiles = () => {
  return useQuery({
    queryKey: queryKeys.profiles.all,
    queryFn: async () => await window.services.profiles.getAll(),
  });
};
