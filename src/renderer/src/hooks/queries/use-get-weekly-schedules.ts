import { Schedule } from '../../../../shared/types';
import { queryKeys } from '../../lib/query-keys';
import { getAppConfigProperty } from '../../lib/utils';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

interface useGetWeeklySchedulesProp {
  selectedDayOfWeek: number;
  searchQuery?: string;
  profileId?: string | null;
}

const filterWeeklySchedule = (schedule: Schedule, dayOfWeek: number) =>
  schedule.repeat !== 'once' && schedule.triggerDays.includes(dayOfWeek);

export const useGetWeeklySchedules = ({
  selectedDayOfWeek,
  searchQuery,
}: useGetWeeklySchedulesProp) => {
  const activeProfileScheduleId = getAppConfigProperty('activeProfileSchedule');
  return useQuery({
    enabled: !!activeProfileScheduleId,
    placeholderData: keepPreviousData,
    queryKey: queryKeys.schedules({
      selectedDayOfWeek,
      searchQuery,
      profileId: activeProfileScheduleId,
    }),
    queryFn: async () =>
      await window.services.schedules
        .getByProfile(activeProfileScheduleId)
        .then((schedules) =>
          schedules
            .filter((schedule) =>
              filterWeeklySchedule(schedule, selectedDayOfWeek),
            )
            .filter((schedule) =>
              searchQuery
                ? schedule.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                : true,
            ),
        ),
  });
};
