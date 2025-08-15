import { userSounds } from '../../shared/schema';
import { NewUserSound, UserSound } from '../../shared/types';
import { db } from '../lib/database';
import { and, eq } from 'drizzle-orm';

export const getUserSounds = async (
  userId: UserSound['userId'],
): Promise<UserSound[]> => {
  return db.query.userSounds.findMany({ where: eq(userSounds.userId, userId) });
};

export const createUserSound = async (
  data: NewUserSound,
): Promise<UserSound[]> => {
  return db.insert(userSounds).values(data).returning();
};

export const updateUserSound = async (
  id: UserSound['id'],
  userId: UserSound['userId'],
  data: Partial<NewUserSound>,
): Promise<UserSound[]> => {
  return db
    .update(userSounds)
    .set(data)
    .where(and(eq(userSounds.id, id), eq(userSounds.userId, userId)))
    .returning();
};

export const deleteUserSound = async (
  id: UserSound['id'],
  userId: UserSound['userId'],
): Promise<Pick<UserSound, 'id'>[]> => {
  return db
    .delete(userSounds)
    .where(and(eq(userSounds.id, id), eq(userSounds.userId, userId)))
    .returning({ id: userSounds.id });
};
