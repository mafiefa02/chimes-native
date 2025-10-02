import { userSounds } from '../../shared/schema';
import { NewUserSound, UserSound } from '../../shared/types';
import { db } from '../lib/database';
import { and, eq } from 'drizzle-orm';

/** Retrieves all sounds associated with a specific user. */
export const getUserSounds = async (
  userId: UserSound['userId'],
): Promise<UserSound[]> => {
  return db.query.userSounds.findMany({ where: eq(userSounds.userId, userId) });
};

/** Retrieves a single sound by its ID, ensuring it belongs to the specified user. */
export const getUserSoundById = async (
  userId: UserSound['userId'],
  soundId: UserSound['id'],
): Promise<UserSound | undefined> => {
  return db.query.userSounds.findFirst({
    where: and(eq(userSounds.userId, userId), eq(userSounds.id, soundId)),
  });
};

/** Creates a new user sound entry in the database. */
export const createUserSound = async (
  data: NewUserSound,
): Promise<UserSound[]> => {
  return db.insert(userSounds).values(data).returning();
};

/**
 * Updates a sound entry, verifying that the sound belongs to the user
 * before applying changes.
 */
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

/**
 * Deletes a sound entry, verifying that the sound belongs to the user
 * before deletion.
 */
export const deleteUserSound = async (
  id: UserSound['id'],
  userId: UserSound['userId'],
): Promise<Pick<UserSound, 'id'>[]> => {
  return db
    .delete(userSounds)
    .where(and(eq(userSounds.id, id), eq(userSounds.userId, userId)))
    .returning({ id: userSounds.id });
};
