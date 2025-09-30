import { queryKeys } from '../../lib/query-keys';
import { getAppConfigProperty } from '../../lib/utils';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useGetSchedules = () => {
  const activeProfileScheduleId = getAppConfigProperty('activeProfileSchedule');
  return useQuery({
    enabled: !!activeProfileScheduleId,
    placeholderData: keepPreviousData,
    queryKey: queryKeys.schedules({}),
    queryFn: async () =>
      await window.services.schedules.getByProfile(activeProfileScheduleId),
  });
};
