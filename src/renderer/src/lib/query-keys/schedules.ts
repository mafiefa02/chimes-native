import { getAppConfigProperty } from '../utils';
import { format } from 'date-fns';

type SchedulesQueryKeysProps = {
  profileId: string;
  date?: Date;
  selectedDayOfWeek?: number;
  searchQuery?: string;
};

const activeProfileScheduleId = getAppConfigProperty('activeProfileSchedule');

export const schedulesQueryKeys = ({
  date,
  selectedDayOfWeek,
  searchQuery,
  profileId,
}: SchedulesQueryKeysProps) => [
  'schedule',
  activeProfileScheduleId,
  {
    date: date ? format(date, 'dd-MM-yyyy') : undefined,
    selectedDayOfWeek,
    searchQuery,
    profileId,
  },
];
