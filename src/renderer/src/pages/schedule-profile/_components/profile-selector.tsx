import { useGetProfileSchedules } from '../../../hooks/queries/use-get-schedule-profiles';

export const ProfileSelector = () => {
  const { data: profiles, isPending, isError } = useGetProfileSchedules();

  if (isPending) return 'Loading...';
  if (isError) return 'Error...';

  return profiles.map((profile) => profile.name);
};
