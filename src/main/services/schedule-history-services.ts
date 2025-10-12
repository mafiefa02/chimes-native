import { scheduleHistory } from '../../shared/schema';
import { NewScheduleHistory, ScheduleHistory } from '../../shared/types';
import { db } from '../lib/database';
import { eq } from 'drizzle-orm';

/**
 * Manages all database operations related to schedule execution history.
 */
export class ScheduleHistoryServices {
  /** Retrieves the entire execution history for a specific schedule by its ID. */
  public async getBySchedule(
    scheduleId: ScheduleHistory['scheduleId'],
  ): Promise<ScheduleHistory[]> {
    return db.query.scheduleHistory.findMany({
      where: eq(scheduleHistory.scheduleId, scheduleId),
    });
  }

  /**
   * Creates a new entry in the schedule history, typically used to log an
   * execution of a schedule.
   */
  public async create(data: NewScheduleHistory): Promise<ScheduleHistory[]> {
    return db.insert(scheduleHistory).values(data).returning();
  }
}

export const scheduleHistoryServices = new ScheduleHistoryServices();
