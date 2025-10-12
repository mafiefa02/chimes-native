import { notifications } from '../../shared/schema';
import { NewNotification, Notification } from '../../shared/types';
import { db } from '../lib/database';
import { eq } from 'drizzle-orm';

/**
 * Manages all database operations related to notifications. This class follows
 * a singleton pattern, with a single instance exported for application-wide use.
 */
export class NotificationServices {
  /** Retrieves all notifications for a specific user from the database. */
  public async getByUser(
    userId: Notification['userId'],
  ): Promise<Notification[]> {
    return db.query.notifications.findMany({
      where: eq(notifications.userId, userId),
    });
  }

  /** Creates a new notification in the database. */
  public async create(data: NewNotification): Promise<Notification[]> {
    return db.insert(notifications).values(data).returning();
  }

  /** Updates an existing notification in the database by its ID. */
  public async update(
    id: Notification['id'],
    data: Partial<NewNotification>,
  ): Promise<Notification[]> {
    return db
      .update(notifications)
      .set(data)
      .where(eq(notifications.id, id))
      .returning();
  }

  /** Deletes a notification from the database by its ID. */
  public async delete(
    id: Pick<Notification, 'id'>['id'],
  ): Promise<Pick<Notification, 'id'>[]> {
    return db
      .delete(notifications)
      .where(eq(notifications.id, id))
      .returning({ id: notifications.id });
  }
}

export const notificationServices = new NotificationServices();
