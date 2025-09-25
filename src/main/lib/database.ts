import { config } from '../../../drizzle.config';
import * as schema from '../../shared/schema';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { app } from 'electron';
import path from 'path';

const dbPath = `file:${path.join(app.getPath('userData'), 'chimes.db')}`;
const client = createClient({ url: dbPath });
export const db = drizzle(client, { schema });

export const runMigrations = async () => {
  console.info('INFO: Running database migrations...');
  await migrate(db, { migrationsFolder: config.out });
  console.info('INFO: Database migrations completed.');
};
