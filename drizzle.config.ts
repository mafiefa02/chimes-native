import { Config, defineConfig } from 'drizzle-kit';
import { app } from 'electron';
import path from 'path';

export const config = {
  schema: './src/shared/schema.ts',
  out: app
    ? path.join(app.getAppPath(), 'public', 'drizzle')
    : process.resourcesPath
      ? path.join(process.resourcesPath, 'public', 'drizzle')
      : path.join('public', 'drizzle'),
  dialect: 'sqlite',
  dbCredentials: { url: path.join('data', 'chimes.db') },
} satisfies Config;

export default defineConfig(config);
