import { schedules } from '../../shared/schema';
import { NewSchedule, Schedule } from '../../shared/types';
import { db } from '../lib/database';
import { and, asc, eq } from 'drizzle-orm';

export const getAllActiveSchedules = async (
  profileId: Schedule['profileId'],
): Promise<Schedule[]> => {
  return db.query.schedules.findMany({
    where: and(
      eq(schedules.isActive, true),
      eq(schedules.profileId, profileId),
    ),
  });
};

export const getSchedulesByProfile = async (
  profileId: Schedule['profileId'],
): Promise<Schedule[]> => {
  return db.query.schedules.findMany({
    where: eq(schedules.profileId, profileId),
    orderBy: [asc(schedules.triggerTime)],
  });
};

export const createSchedule = async (
  data: NewSchedule,
): Promise<Schedule[]> => {
  return db.insert(schedules).values(data).returning();
};

export const updateSchedule = async (
  id: Schedule['id'],
  data: Partial<NewSchedule>,
): Promise<Schedule[]> => {
  return db.update(schedules).set(data).where(eq(schedules.id, id)).returning();
};

export const deleteSchedule = async (
  id: Schedule['id'],
): Promise<Pick<Schedule, 'id'>[]> => {
  return db
    .delete(schedules)
    .where(eq(schedules.id, id))
    .returning({ id: schedules.id });
};
