import { scheduleHistory } from '../../shared/schema';
import { NewScheduleHistory, ScheduleHistory } from '../../shared/types';
import { db } from '../lib/database';
import { eq } from 'drizzle-orm';

/** Retrieves the entire execution history for a specific schedule by its ID. */
export const getHistoryBySchedule = async (
  scheduleId: ScheduleHistory['scheduleId'],
): Promise<ScheduleHistory[]> => {
  return db.query.scheduleHistory.findMany({
    where: eq(scheduleHistory.scheduleId, scheduleId),
  });
};

/**
 * Creates a new entry in the schedule history, typically used to log an
 * execution of a schedule.
 */
export const createScheduleHistoryEntry = async (
  data: NewScheduleHistory,
): Promise<ScheduleHistory[]> => {
  return db.insert(scheduleHistory).values(data).returning();
};
