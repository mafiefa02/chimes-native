import { userProfiles } from '../../shared/schema';
import { NewUserProfile, UserProfile } from '../../shared/types';
import { db } from '../lib/database';
import { eq } from 'drizzle-orm';

/** Retrieves all user profiles from the database. */
export const getAllProfiles = async (): Promise<UserProfile[]> => {
  return db.query.userProfiles.findMany();
};

/** Retrieves a single user profile from the database by its unique ID. */
export const getProfileById = async (
  id: UserProfile['id'],
): Promise<UserProfile | undefined> => {
  return db.query.userProfiles.findFirst({ where: eq(userProfiles.id, id) });
};

/** Creates a new user profile in the database. */
export const createProfile = async (
  data: NewUserProfile,
): Promise<UserProfile[]> => {
  return db.insert(userProfiles).values(data).returning();
};

/** Updates an existing user profile in the database by its ID. */
export const updateProfile = async (
  id: UserProfile['id'],
  data: Partial<NewUserProfile>,
): Promise<UserProfile[]> => {
  return db
    .update(userProfiles)
    .set(data)
    .where(eq(userProfiles.id, id))
    .returning();
};

/** Deletes a user profile from the database by its ID. */
export const deleteProfile = async (
  id: UserProfile['id'],
): Promise<Pick<UserProfile, 'id'>[]> => {
  return db
    .delete(userProfiles)
    .where(eq(userProfiles.id, id))
    .returning({ id: userProfiles.id });
};
