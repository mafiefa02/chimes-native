import {
  AppConfig,
  UserProfile,
  NewUserProfile,
  ScheduleProfile,
  NewScheduleProfile,
  UserSound,
  NewUserSound,
  Schedule,
  NewSchedule,
  ScheduleHistory,
  NewScheduleHistory,
} from '../../shared/types';

export interface IServices {
  appConfig: {
    get: <K extends keyof AppConfig>(key: K) => AppConfig[K];
    set: <K extends keyof AppConfig, V extends AppConfig[K]>(
      key: K,
      value: V,
    ) => Promise<void>;
  };
  profiles: {
    getAll: () => Promise<UserProfile[]>;
    getById: (id: UserProfile['id']) => Promise<UserProfile | undefined>;
    create: (data: NewUserProfile) => Promise<UserProfile[]>;
    update: (
      id: UserProfile['id'],
      data: Partial<NewUserProfile>,
    ) => Promise<UserProfile[]>;
    delete: (id: UserProfile['id']) => Promise<{ id: UserProfile['id'] }[]>;
  };
  scheduleProfiles: {
    getByUser: (
      userId: ScheduleProfile['userId'],
    ) => Promise<ScheduleProfile[]>;
    create: (data: NewScheduleProfile) => Promise<ScheduleProfile[]>;
    update: (
      id: ScheduleProfile['id'],
      data: Partial<NewScheduleProfile>,
    ) => Promise<ScheduleProfile[]>;
    delete: (
      id: ScheduleProfile['id'],
    ) => Promise<{ id: ScheduleProfile['id'] }[]>;
  };
  userSounds: {
    getByUser: (userId: UserSound['userId']) => Promise<UserSound[]>;
    getBySoundId: (
      userId: UserSound['userId'],
      soundId: UserSound['id'],
    ) => Promise<UserSound | undefined>;
    create: (data: NewUserSound) => Promise<UserSound[]>;
    update: (
      id: UserSound['id'],
      userId: UserSound['userId'],
      data: Partial<NewUserSound>,
    ) => Promise<UserSound[]>;
    delete: (
      id: UserSound['id'],
      userId: UserSound['userId'],
    ) => Promise<{ id: UserSound['id'] }[]>;
  };
  schedules: {
    getByProfile: (profileId: Schedule['profileId']) => Promise<Schedule[]>;
    create: (data: NewSchedule) => Promise<Schedule[]>;
    update: (
      id: Schedule['id'],
      data: Partial<NewSchedule>,
    ) => Promise<Schedule[]>;
    delete: (id: Schedule['id']) => Promise<{ id: Schedule['id'] }[]>;
  };
  scheduleHistory: {
    getBySchedule: (
      scheduleId: ScheduleHistory['scheduleId'],
    ) => Promise<ScheduleHistory[]>;
    create: (data: NewScheduleHistory) => Promise<ScheduleHistory[]>;
  };
}
