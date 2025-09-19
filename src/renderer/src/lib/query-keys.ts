import { UserSound } from '../../../shared/types';
import { getAppConfigProperty } from './utils';
import { format } from 'date-fns';

const activeProfileScheduleId = getAppConfigProperty('activeProfileSchedule');

export const queryKeys = {
  profiles: { all: ['profiles'] },
  profileSchedules: { all: ['profile-schedules'] },
  schedules: {
    all: (date: Date) => [
      'schedule',
      activeProfileScheduleId,
      format(date, 'dd-MM-yyyy'),
    ],
  },
  sounds: { all: ['sounds'], detail: (id: UserSound['id']) => ['sounds', id] },
};
