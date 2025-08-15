import { scheduleProfiles } from '../../shared/schema';
import { NewScheduleProfile, ScheduleProfile } from '../../shared/types';
import { db } from '../lib/database';
import { eq } from 'drizzle-orm';

export const getScheduleProfilesByUser = async (
  userId: string,
): Promise<ScheduleProfile[]> => {
  return db.query.scheduleProfiles.findMany({
    where: eq(scheduleProfiles.userId, userId),
  });
};

export const createScheduleProfile = async (
  data: NewScheduleProfile,
): Promise<ScheduleProfile[]> => {
  return db.insert(scheduleProfiles).values(data).returning();
};

export const updateScheduleProfile = async (
  id: string,
  data: Partial<NewScheduleProfile>,
): Promise<ScheduleProfile[]> => {
  return db
    .update(scheduleProfiles)
    .set(data)
    .where(eq(scheduleProfiles.id, id))
    .returning();
};

export const deleteScheduleProfile = async (
  id: string,
): Promise<{ id: string }[]> => {
  return db
    .delete(scheduleProfiles)
    .where(eq(scheduleProfiles.id, id))
    .returning({ id: scheduleProfiles.id });
};
