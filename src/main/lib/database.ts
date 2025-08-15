import * as schema from '../../shared/schema';
import { createClient } from '@libsql/client';
import { count } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { app } from 'electron';
import path from 'path';

const dbPath = path.join(app.getPath('userData'), 'chimes.db');
const client = createClient({ url: `file:${dbPath}` });
export const db = drizzle(client, { schema });

export const initializeDatabase = async () => {
  // Run migrations on startup.
  await migrate(db, { migrationsFolder: 'drizzle' });

  // Check if the default user profile exists, and create it if it doesn't.
  const [{ value: userProfilesCount }] = await db
    .select({ value: count() })
    .from(schema.userProfiles);

  if (userProfilesCount === 0) {
    await db
      .insert(schema.userProfiles)
      .values({ displayName: 'Default', avatar: null });
    console.info('Default user profile created.');
  }
};
