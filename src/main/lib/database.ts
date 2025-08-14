import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { app } from 'electron';
import path from 'path';

export const database = () => {
  const dbPath = path.join(app.getPath('userData'), 'chimes.db');
  const client = createClient({ url: `file:${dbPath}` });
  const db = drizzle(client);
  return db;
};
