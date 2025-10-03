import * as schema from '../../shared/schema';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { app } from 'electron';
import path from 'path';

/** Defines the file path for the local SQLite database. */
const dbPath = `file:${path.join(app.getPath('userData'), 'chimes.db')}`;

/** Creates a low-level database client connection. */
const client = createClient({ url: dbPath });

/**
 * The main Drizzle ORM instance for the application. It is configured with the
 * database client and the application's schema, serving as the primary
 * interface for all database queries and operations.
 */
export const db = drizzle(client, { schema });

/**
 * Executes pending database migrations to synchronize the database schema with the
 * latest version defined in the migration files. This function should be called
 * during application startup to ensure the database structure is up-to-date.
 */
export const runMigrations = async () => {
  // Determine the base path depending on whether the app is packaged or in development
  const basePath = app.isPackaged ? process.resourcesPath : app.getAppPath();
  const migrationsFolder = path.join(basePath, 'public', 'drizzle');

  await migrate(db, { migrationsFolder });
};
