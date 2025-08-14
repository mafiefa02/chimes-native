import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/main/lib/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: { url: 'chimes.db' },
});
