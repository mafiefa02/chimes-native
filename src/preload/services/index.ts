import { Services } from '../types';
import { appConfigServices } from './app-config-services';
import { profileServices } from './profile-services';
import { scheduleHistoryServices } from './schedule-history-services';
import { scheduleProfileServices } from './schedule-profile-services';
import { scheduleServices } from './schedule-services';
import { userSoundServices } from './user-sound-services';

export const services: Services = {
  appConfig: appConfigServices,
  profile: profileServices,
  scheduleProfile: scheduleProfileServices,
  userSound: userSoundServices,
  schedule: scheduleServices,
  scheduleHistory: scheduleHistoryServices,
};
