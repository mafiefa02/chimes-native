import { useQuery } from '@tanstack/react-query';

export const useGetProfiles = () => {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: async () => await window.services.profiles.getAll(),
  });
};
