import { UserSound } from '../../../shared/types';
import { getAppConfigProperty } from './utils';
import { format } from 'date-fns';

const activeProfileScheduleId = getAppConfigProperty('activeProfileSchedule');

export const queryKeys = {
  profiles: () => ['profiles'],
  profileSchedules: () => ['profile-schedules'],
  schedules: ({
    date,
    selectedDayOfWeek,
    searchQuery,
  }: {
    date?: Date;
    selectedDayOfWeek?: number;
    searchQuery?: string;
  }) => [
    'schedule',
    activeProfileScheduleId,
    {
      date: date ? format(date, 'dd-MM-yyyy') : undefined,
      selectedDayOfWeek,
      searchQuery,
    },
  ],
  sounds: ({ id }: { id?: UserSound['id'] }) => ['sounds', { id }],
};
