import { filterActiveSchedules } from '../../../../shared/utils';
import { queryKeys } from '../../lib/query-keys';
import { getAppConfigProperty } from '../../lib/utils';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

interface useGetActiveSchedulesProp {
  date: Date;
}

export const useGetActiveSchedules = ({ date }: useGetActiveSchedulesProp) => {
  const activeProfileScheduleId = getAppConfigProperty('activeProfileSchedule');
  return useQuery({
    enabled: !!activeProfileScheduleId,
    placeholderData: keepPreviousData,
    queryKey: queryKeys.schedules({ date, profileId: activeProfileScheduleId }),
    queryFn: async () =>
      await window.services.schedule
        .getByProfile(activeProfileScheduleId)
        .then((schedules) =>
          schedules.filter((schedule) => filterActiveSchedules(schedule, date)),
        ),
  });
};
