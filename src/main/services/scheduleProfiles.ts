import { scheduleProfiles } from '../../shared/schema';
import { NewScheduleProfile, ScheduleProfile } from '../../shared/types';
import { db } from '../lib/database';
import { eq } from 'drizzle-orm';

/** Retrieves all schedule profiles associated with a specific user ID. */
export const getScheduleProfilesByUser = async (
  userId: ScheduleProfile['userId'],
): Promise<ScheduleProfile[]> => {
  return db.query.scheduleProfiles.findMany({
    where: eq(scheduleProfiles.userId, userId),
  });
};

/** Creates a new schedule profile in the database. */
export const createScheduleProfile = async (
  data: NewScheduleProfile,
): Promise<ScheduleProfile[]> => {
  return db.insert(scheduleProfiles).values(data).returning();
};

/** Updates an existing schedule profile in the database by its ID. */
export const updateScheduleProfile = async (
  id: ScheduleProfile['id'],
  data: Partial<NewScheduleProfile>,
): Promise<ScheduleProfile[]> => {
  return db
    .update(scheduleProfiles)
    .set(data)
    .where(eq(scheduleProfiles.id, id))
    .returning();
};

/** Deletes a schedule profile from the database by its ID. */
export const deleteScheduleProfile = async (
  id: ScheduleProfile['id'],
): Promise<Pick<ScheduleProfile, 'id'>[]> => {
  return db
    .delete(scheduleProfiles)
    .where(eq(scheduleProfiles.id, id))
    .returning({ id: scheduleProfiles.id });
};
