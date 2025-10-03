import { userProfiles } from '../../shared/schema';
import { NewUserProfile, UserProfile } from '../../shared/types';
import { db } from '../lib/database';
import { eq } from 'drizzle-orm';

/**
 * Manages all database operations related to user profiles.
 */
export class ProfileServices {
  /** Retrieves all user profiles from the database. */
  public async getAll(): Promise<UserProfile[]> {
    return db.query.userProfiles.findMany();
  }

  /** Retrieves a single user profile from the database by its unique ID. */
  public async getById(
    id: UserProfile['id'],
  ): Promise<UserProfile | undefined> {
    return db.query.userProfiles.findFirst({ where: eq(userProfiles.id, id) });
  }

  /** Creates a new user profile in the database. */
  public async create(data: NewUserProfile): Promise<UserProfile[]> {
    return db.insert(userProfiles).values(data).returning();
  }

  /** Updates an existing user profile in the database by its ID. */
  public async update(
    id: UserProfile['id'],
    data: Partial<NewUserProfile>,
  ): Promise<UserProfile[]> {
    return db
      .update(userProfiles)
      .set(data)
      .where(eq(userProfiles.id, id))
      .returning();
  }

  /** Deletes a user profile from the database by its ID. */
  public async delete(
    id: UserProfile['id'],
  ): Promise<Pick<UserProfile, 'id'>[]> {
    return db
      .delete(userProfiles)
      .where(eq(userProfiles.id, id))
      .returning({ id: userProfiles.id });
  }
}

/**
 * A singleton instance of the ProfileServices class.
 */
export const profileServices = new ProfileServices();
