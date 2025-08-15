import type {
  scheduleHistory,
  scheduleProfiles,
  schedules,
  userProfiles,
  userSounds,
} from './schema';

export type UserProfile = typeof userProfiles.$inferSelect;
export type ScheduleProfile = typeof scheduleProfiles.$inferSelect;
export type UserSounds = typeof userSounds.$inferSelect;
export type Schedules = typeof schedules.$inferSelect;
export type ScheduleHistory = typeof scheduleHistory.$inferSelect;
