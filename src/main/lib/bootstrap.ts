import {
  scheduleProfiles,
  userProfiles,
  userSounds,
} from '../../shared/schema';
import { AppConfig } from '../../shared/types';
import { services } from '../services';
import { defaultSoundFile } from './constants';
import { db, runMigrations } from './database';
import { count } from 'drizzle-orm';
import { app, dialog } from 'electron';

/**
 * Initializes the entire application. This function orchestrates the setup
 * process by initializing the database and starting core services like the
 * schedule player. If any part of the initialization fails, it logs the error,
 * displays an error dialog to the user, and quits the application to prevent
 * it from running in an unstable state.
 */
export const initializeApp = async (): Promise<void> => {
  try {
    await initializeDatabase();
    services.schedulePlayer.start();
  } catch (error: unknown) {
    dialog.showErrorBox('Initialization Error', (error as Error).message);
    app.quit();
  }
};

/**
 * A generic helper function to synchronize an active profile ID stored in the
 * application's configuration file with the available profiles in the database.
 * It ensures the configuration does not point to a deleted or non-existent profile.
 * If the configured ID is invalid or missing, it resets it to the first available
 * profile.
 */
const syncActiveProfile = async (
  configKey: keyof AppConfig,
  getAvailableProfiles: () => Promise<{ id: string }[]>,
) => {
  const currentActiveProfileId = services.appConfig.getProperty(configKey);
  const availableProfiles = await getAvailableProfiles();
  const availableProfileIds = availableProfiles.map((p) => p.id);

  if (
    !currentActiveProfileId ||
    !availableProfileIds.includes(String(currentActiveProfileId))
  ) {
    if (availableProfileIds.length > 0) {
      await services.appConfig.setProperty(configKey, availableProfileIds[0]);
    } else {
      console.warn(`WARN: No available profiles found for ${configKey}.`);
    }
  }
};

/**
 * Creates a default user profile in the database with the name "Default".
 * After creation, it sets this new profile as the 'activeProfile' in the
 * application's configuration.
 */
const seedDefaultUserProfile = async () => {
  const defaultUserProfile = { displayName: 'Default', avatar: null };
  const [{ id }] = await db
    .insert(userProfiles)
    .values(defaultUserProfile)
    .returning({ id: userProfiles.id });
  await services.appConfig.setProperty('activeProfile', id);
};

/**
 * Seeds the database with a default sound entry. It associates this sound,
 * named "Default", with the currently active user profile and links it to a
 * predefined default audio file.
 */
const seedDefaultSound = async () => {
  const activeUserId = services.appConfig.getProperty('activeProfile');
  await db
    .insert(userSounds)
    .values({
      name: 'Default',
      userId: activeUserId,
      filePath: defaultSoundFile,
    });
};

/**
 * Creates a default schedule profile in the database, associating it with the
 * currently active user. After creation, it sets this new schedule profile as
 * the 'activeProfileSchedule' in the application's configuration.
 */
const seedDefaultScheduleProfile = async () => {
  const activeUserId = services.appConfig.getProperty('activeProfile');
  const [{ id }] = await db
    .insert(scheduleProfiles)
    .values({ name: 'Default', userId: activeUserId })
    .returning({ id: scheduleProfiles.id });
  await services.appConfig.setProperty('activeProfileSchedule', id);
};

/**
 * Initializes the application database. It first runs any pending database
 * migrations to ensure the schema is up-to-date. Afterwards, it seeds the
 * database with essential default data (user profile, sound, and schedule profile)
 * only if the respective tables are empty. This ensures the application has a
 * valid default state on first launch. Finally, it syncs the app configuration
 * to ensure active profile IDs are valid.
 */
const initializeDatabase = async () => {
  await runMigrations();

  // Seed default user profile if none exist
  const [{ value: userCount }] = await db
    .select({ value: count() })
    .from(userProfiles);
  if (userCount === 0) {
    seedDefaultUserProfile();
  }

  // Seed default sound if none exist
  const [{ value: soundCount }] = await db
    .select({ value: count() })
    .from(userSounds);
  if (soundCount === 0) {
    seedDefaultSound();
  }

  // Seed default schedule profile
  const [{ value: scheduleProfileCount }] = await db
    .select({ value: count() })
    .from(scheduleProfiles);
  if (scheduleProfileCount === 0) {
    seedDefaultScheduleProfile();
  }

  // Finally, sync config with DB state
  await syncActiveProfile('activeProfile', () =>
    db.select({ id: userProfiles.id }).from(userProfiles),
  );
  await syncActiveProfile('activeProfileSchedule', () =>
    db.select({ id: scheduleProfiles.id }).from(scheduleProfiles),
  );
};
