import { scheduleProfiles } from '../../shared/schema';
import { NewScheduleProfile, ScheduleProfile } from '../../shared/types';
import { db } from '../lib/database';
import { eq } from 'drizzle-orm';

/**
 * Manages all database operations related to schedule profiles.
 */
export class ScheduleProfileServices {
  /** Retrieves all schedule profiles associated with a specific user ID. */
  public async getByUser(
    userId: ScheduleProfile['userId'],
  ): Promise<ScheduleProfile[]> {
    return db.query.scheduleProfiles.findMany({
      where: eq(scheduleProfiles.userId, userId),
    });
  }

  /** Creates a new schedule profile in the database. */
  public async create(data: NewScheduleProfile): Promise<ScheduleProfile[]> {
    return db.insert(scheduleProfiles).values(data).returning();
  }

  /** Updates an existing schedule profile in the database by its ID. */
  public async update(
    id: ScheduleProfile['id'],
    data: Partial<NewScheduleProfile>,
  ): Promise<ScheduleProfile[]> {
    return db
      .update(scheduleProfiles)
      .set(data)
      .where(eq(scheduleProfiles.id, id))
      .returning();
  }

  /** Deletes a schedule profile from the database by its ID. */
  public async delete(
    id: ScheduleProfile['id'],
  ): Promise<Pick<ScheduleProfile, 'id'>[]> {
    return db
      .delete(scheduleProfiles)
      .where(eq(scheduleProfiles.id, id))
      .returning({ id: scheduleProfiles.id });
  }
}

export const scheduleProfileServices = new ScheduleProfileServices();
