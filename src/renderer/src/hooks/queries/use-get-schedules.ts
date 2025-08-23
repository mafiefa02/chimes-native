import { filterActiveSchedules } from '../../../../shared/utils';
import { queryKeys } from '../../lib/query-keys';
import { getAppConfigProperty } from '../../lib/utils';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useGetSchedules = (date: Date | undefined = new Date()) => {
  const activeProfileScheduleId = getAppConfigProperty('activeProfileSchedule');
  return useQuery({
    enabled: !!activeProfileScheduleId,
    placeholderData: keepPreviousData,
    queryKey: queryKeys.schedules.all(date),
    queryFn: async () =>
      await window.services.schedules
        .getByProfile(activeProfileScheduleId)
        .then((schedules) =>
          schedules.filter((schedule) => filterActiveSchedules(schedule, date)),
        ),
  });
};
