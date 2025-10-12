import { appConfigServices } from './app-config-services';
import { notificationServices } from './notification-services';
import { profileServices } from './profile-services';
import { scheduleHistoryServices } from './schedule-history-services';
import { schedulePlayerServices } from './schedule-player-services';
import { scheduleProfileServices } from './schedule-profile-services';
import { scheduleServices } from './schedule-services';
import { userSoundsServices } from './user-sound-services';

export const services = {
  appConfig: appConfigServices,
  notification: notificationServices,
  profile: profileServices,
  scheduleHistory: scheduleHistoryServices,
  schedulePlayer: schedulePlayerServices,
  scheduleProfile: scheduleProfileServices,
  schedule: scheduleServices,
  userSound: userSoundsServices,
};
