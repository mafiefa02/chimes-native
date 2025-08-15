import { notifications } from '../../shared/schema';
import { NewNotification, Notification } from '../../shared/types';
import { db } from '../lib/database';
import { eq } from 'drizzle-orm';

export const getNotificationsByProfile = async (
  profileId: string,
): Promise<Notification[]> => {
  return db.query.notifications.findMany({
    where: eq(notifications.userId, profileId),
  });
};

export const createNotification = async (
  data: NewNotification,
): Promise<Notification[]> => {
  return db.insert(notifications).values(data).returning();
};

export const updateNotification = async (
  id: Notification['id'],
  data: Partial<NewNotification>,
): Promise<Notification[]> => {
  return db
    .update(notifications)
    .set(data)
    .where(eq(notifications.id, id))
    .returning();
};

export const deleteSchedule = async (
  id: Pick<Notification, 'id'>['id'],
): Promise<Pick<Notification, 'id'>[]> => {
  return db
    .delete(notifications)
    .where(eq(notifications.id, id))
    .returning({ id: notifications.id });
};
