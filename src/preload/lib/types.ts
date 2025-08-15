import {
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
  profiles: {
    getAll: () => Promise<UserProfile[]>;
    getById: (id: string) => Promise<UserProfile | undefined>;
    create: (data: NewUserProfile) => Promise<UserProfile[]>;
    update: (
      id: string,
      data: Partial<NewUserProfile>,
    ) => Promise<UserProfile[]>;
    delete: (id: string) => Promise<{ id: string }[]>;
  };
  scheduleProfiles: {
    getByUser: (userId: string) => Promise<ScheduleProfile[]>;
    create: (data: NewScheduleProfile) => Promise<ScheduleProfile[]>;
    update: (
      id: string,
      data: Partial<NewScheduleProfile>,
    ) => Promise<ScheduleProfile[]>;
    delete: (id: string) => Promise<{ id: string }[]>;
  };
  userSounds: {
    getByUser: (userId: string) => Promise<UserSound[]>;
    create: (data: NewUserSound) => Promise<UserSound[]>;
    update: (
      id: number,
      userId: string,
      data: Partial<NewUserSound>,
    ) => Promise<UserSound[]>;
    delete: (id: number, userId: string) => Promise<{ id: number }[]>;
  };
  schedules: {
    getByProfile: (profileId: string) => Promise<Schedule[]>;
    create: (data: NewSchedule) => Promise<Schedule[]>;
    update: (id: string, data: Partial<NewSchedule>) => Promise<Schedule[]>;
    delete: (id: string) => Promise<{ id: string }[]>;
  };
  scheduleHistory: {
    getBySchedule: (scheduleId: string) => Promise<ScheduleHistory[]>;
    create: (data: NewScheduleHistory) => Promise<ScheduleHistory[]>;
  };
}
