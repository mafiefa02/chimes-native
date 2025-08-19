import type {
  userProfiles,
  scheduleProfiles,
  userSounds,
  schedules,
  scheduleHistory,
  notifications,
} from './schema';

export type UserProfile = typeof userProfiles.$inferSelect;
export type NewUserProfile = typeof userProfiles.$inferInsert;

export type ScheduleProfile = typeof scheduleProfiles.$inferSelect;
export type NewScheduleProfile = typeof scheduleProfiles.$inferInsert;

export type UserSound = typeof userSounds.$inferSelect;
export type NewUserSound = typeof userSounds.$inferInsert;

export type Schedule = typeof schedules.$inferSelect;
export type NewSchedule = typeof schedules.$inferInsert;

export type ScheduleHistory = typeof scheduleHistory.$inferSelect;
export type NewScheduleHistory = typeof scheduleHistory.$inferInsert;

export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;

export type AppConfig = {
  activeProfile: UserProfile['id'];
  activeProfileSchedule: ScheduleProfile['id'];
  firstDayOfweek: number;
};
