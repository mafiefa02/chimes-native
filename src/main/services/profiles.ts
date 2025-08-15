import { userProfiles } from '../../shared/schema';
import { NewUserProfile, UserProfile } from '../../shared/types';
import { db } from '../lib/database';
import { eq } from 'drizzle-orm';

export const getAllProfiles = async (): Promise<UserProfile[]> => {
  return db.query.userProfiles.findMany();
};

export const getProfileById = async (
  id: string,
): Promise<UserProfile | undefined> => {
  return db.query.userProfiles.findFirst({ where: eq(userProfiles.id, id) });
};

export const createProfile = async (
  data: NewUserProfile,
): Promise<UserProfile[]> => {
  return db.insert(userProfiles).values(data).returning();
};

export const updateProfile = async (
  id: string,
  data: Partial<NewUserProfile>,
): Promise<UserProfile[]> => {
  return db
    .update(userProfiles)
    .set(data)
    .where(eq(userProfiles.id, id))
    .returning();
};

export const deleteProfile = async (id: string): Promise<{ id: string }[]> => {
  return db
    .delete(userProfiles)
    .where(eq(userProfiles.id, id))
    .returning({ id: userProfiles.id });
};
