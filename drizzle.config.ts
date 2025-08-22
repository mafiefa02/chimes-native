import { Config, defineConfig } from 'drizzle-kit';
import { app } from 'electron';
import path from 'path';

export const config = {
  schema: './src/shared/schema.ts',
  out: app.isPackaged
    ? path.join(process.resourcesPath, 'public', 'drizzle')
    : path.join(app.getAppPath(), 'public', 'drizzle'),
  dialect: 'sqlite',
  dbCredentials: { url: 'data/chimes.db' },
} satisfies Config;

export default defineConfig(config);
