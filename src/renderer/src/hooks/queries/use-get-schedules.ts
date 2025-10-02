import { queryKeys } from '../../lib/query-keys';
import { useAppConfig } from '../use-app-config';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useGetSchedules = () => {
  const activeProfileScheduleId = useAppConfig('activeProfileSchedule');
  return useQuery({
    enabled: !!activeProfileScheduleId,
    placeholderData: keepPreviousData,
    queryKey: queryKeys.schedules({ profileId: activeProfileScheduleId }),
    queryFn: async () =>
      await window.services.schedules.getByProfile(activeProfileScheduleId),
  });
};
