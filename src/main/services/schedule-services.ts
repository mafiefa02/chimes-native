import { schedules } from '../../shared/schema';
import { NewSchedule, Schedule } from '../../shared/types';
import { db } from '../lib/database';
import { and, asc, eq, sql } from 'drizzle-orm';

/**
 * Manages all database operations related to individual schedules.
 */
export class ScheduleServices {
  /** Retrieves all schedules for a specific profile that are marked as 'active'. */
  public async getAllActive(
    profileId: Schedule['profileId'],
  ): Promise<Schedule[]> {
    return db.query.schedules.findMany({
      where: and(
        eq(schedules.isActive, true),
        eq(schedules.profileId, profileId),
      ),
    });
  }

  /**
   * Retrieves all schedules for a specific profile, ordered by their trigger time
   * adjusted for the user's local timezone. This ensures that the schedules are
   * displayed in the correct chronological order as the user would expect to see them.
   */
  public async getByProfile(
    profileId: Schedule['profileId'],
  ): Promise<Schedule[]> {
    const offsetInMinutes = -new Date().getTimezoneOffset();
    const offsetSign = offsetInMinutes > 0 ? '+' : '';
    const timezoneModifier = `${offsetSign}${offsetInMinutes} minutes`;

    return db.query.schedules.findMany({
      where: eq(schedules.profileId, profileId),
      orderBy: [asc(sql`time(${schedules.triggerTime}, ${timezoneModifier})`)],
    });
  }

  /** Creates a new schedule in the database. */
  public async create(data: NewSchedule): Promise<Schedule[]> {
    return db.insert(schedules).values(data).returning();
  }

  /** Updates an existing schedule in the database by its ID. */
  public async update(
    id: Schedule['id'],
    data: Partial<NewSchedule>,
  ): Promise<Schedule[]> {
    return db
      .update(schedules)
      .set(data)
      .where(eq(schedules.id, id))
      .returning();
  }

  /** Deletes a schedule from the database by its ID. */
  public async delete(id: Schedule['id']): Promise<Pick<Schedule, 'id'>[]> {
    return db
      .delete(schedules)
      .where(eq(schedules.id, id))
      .returning({ id: schedules.id });
  }
}

/**
 * A singleton instance of the ScheduleServices class.
 */
export const scheduleServices = new ScheduleServices();
