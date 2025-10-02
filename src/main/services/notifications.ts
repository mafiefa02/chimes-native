import { notifications } from '../../shared/schema';
import { NewNotification, Notification } from '../../shared/types';
import { db } from '../lib/database';
import { eq } from 'drizzle-orm';

/** Retrieves all notifications for a specific user from the database. */
export const getNotificationsByUser = async (
  userId: Notification['userId'],
): Promise<Notification[]> => {
  return db.query.notifications.findMany({
    where: eq(notifications.userId, userId),
  });
};

/** Creates a new notification in the database. */
export const createNotification = async (
  data: NewNotification,
): Promise<Notification[]> => {
  return db.insert(notifications).values(data).returning();
};

/** Updates an existing notification in the database by its ID. */
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

/** Deletes a notification from the database by its ID. */
export const deleteNotification = async (
  id: Pick<Notification, 'id'>['id'],
): Promise<Pick<Notification, 'id'>[]> => {
  return db
    .delete(notifications)
    .where(eq(notifications.id, id))
    .returning({ id: notifications.id });
};
