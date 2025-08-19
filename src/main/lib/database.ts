import * as schema from '../../shared/schema';
import { ensureDirExists } from '../../shared/utils';
import { dbPath } from './constants';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';

const client = createClient({ url: `file:${ensureDirExists(dbPath)}` });
export const db = drizzle(client, { schema });

export const runMigrations = async () => {
  console.info('INFO: Running database migrations...');
  await migrate(db, { migrationsFolder: './drizzle' });
  console.info('INFO: Database migrations completed.');
};
