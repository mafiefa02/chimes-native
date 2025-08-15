import { scheduleHistory } from '../../shared/schema';
import { NewScheduleHistory, ScheduleHistory } from '../../shared/types';
import { db } from '../lib/database';
import { eq } from 'drizzle-orm';

export const getHistoryBySchedule = async (
  scheduleId: string,
): Promise<ScheduleHistory[]> => {
  return db.query.scheduleHistory.findMany({
    where: eq(scheduleHistory.scheduleId, scheduleId),
  });
};

export const createScheduleHistoryEntry = async (
  data: NewScheduleHistory,
): Promise<ScheduleHistory[]> => {
  return db.insert(scheduleHistory).values(data).returning();
};
