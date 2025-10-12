import type { AppConfigServices } from './app-config-services.types';
import { ProfilesServices } from './profiles-services.types';
import { ScheduleHistoryServices } from './schedule-history-services.types';
import { ScheduleProfilesServices } from './schedule-profiles-services.types';
import { SchedulesServices } from './schedules-services.types';
import { UserSoundsServices } from './user-sounds-services.types';

export interface Services {
  appConfig: AppConfigServices;
  profile: ProfilesServices;
  scheduleProfile: ScheduleProfilesServices;
  userSound: UserSoundsServices;
  schedule: SchedulesServices;
  scheduleHistory: ScheduleHistoryServices;
}
