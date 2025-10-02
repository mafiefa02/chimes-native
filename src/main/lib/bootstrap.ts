import {
  scheduleProfiles,
  userProfiles,
  userSounds,
} from '../../shared/schema';
import { AppConfig } from '../../shared/types';
import {
  getAppConfigProperty,
  setAppConfigProperty,
} from '../services/appConfig';
import { start as startSchedulePlayer } from '../services/schedulePlayer';
import { defaultSoundFile } from './constants';
import { db, runMigrations } from './database';
import { count } from 'drizzle-orm';
import { app, dialog } from 'electron';

export const initializeApp = async (): Promise<void> => {
  try {
    await initializeDatabase();
    startSchedulePlayer();
    console.log('INFO: Application initialization complete.');
  } catch (error: unknown) {
    console.error('FATAL: Failed to initialize the application.', error);
    dialog.showErrorBox('Initialization Error', (error as Error).message);
    app.quit();
  }
};

/**
 * A generic helper to sync active profile ID in the config file with
 * the database.
 */
const syncActiveProfile = async (
  configKey: keyof AppConfig,
  getAvailableProfiles: () => Promise<{ id: string }[]>,
) => {
  const currentActiveProfileId = getAppConfigProperty(configKey);
  const availableProfiles = await getAvailableProfiles();
  const availableProfileIds = availableProfiles.map((p) => p.id);

  if (
    !currentActiveProfileId ||
    !availableProfileIds.includes(String(currentActiveProfileId))
  ) {
    if (availableProfileIds.length > 0) {
      await setAppConfigProperty(configKey, availableProfileIds[0]);
      console.info(
        `INFO: ${configKey} was out of sync. Resetting to the first available profile.`,
      );
    } else {
      console.warn(`WARN: No available profiles found for ${configKey}.`);
    }
  }
};

/**
 * Runs database migrations and seeds the database with essential default data
 * if it's empty.
 */
const initializeDatabase = async () => {
  console.log('INFO: Initializing database...');
  await runMigrations();

  // Seed Default User Profile
  const [{ value: userCount }] = await db
    .select({ value: count() })
    .from(userProfiles);
  if (userCount === 0) {
    const [{ id }] = await db
      .insert(userProfiles)
      .values({ displayName: 'Default', avatar: null })
      .returning({ id: userProfiles.id });
    await setAppConfigProperty('activeProfile', id);
    console.info('INFO: Created default user profile.');
  }

  const activeUserId = getAppConfigProperty('activeProfile');
  if (!activeUserId) {
    console.error(
      'FATAL: Could not determine active user profile for seeding.',
    );
    return;
  }

  // Seed Default Sound
  const [{ value: soundCount }] = await db
    .select({ value: count() })
    .from(userSounds);
  if (soundCount === 0) {
    await db
      .insert(userSounds)
      .values({
        name: 'Default',
        userId: activeUserId,
        filePath: defaultSoundFile,
      });
    console.info('INFO: Created default sound DB entry.');
  }

  // Seed Default Schedule Profile
  const [{ value: scheduleProfileCount }] = await db
    .select({ value: count() })
    .from(scheduleProfiles);
  if (scheduleProfileCount === 0) {
    const [{ id }] = await db
      .insert(scheduleProfiles)
      .values({ name: 'Default', userId: activeUserId })
      .returning({ id: scheduleProfiles.id });
    await setAppConfigProperty('activeProfileSchedule', id);
    console.info('INFO: Created default schedule profile.');
  }

  // Finally, sync config with DB state
  await syncActiveProfile('activeProfile', () =>
    db.select({ id: userProfiles.id }).from(userProfiles),
  );
  await syncActiveProfile('activeProfileSchedule', () =>
    db.select({ id: scheduleProfiles.id }).from(scheduleProfiles),
  );
};
