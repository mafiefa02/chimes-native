import { scheduleProfiles, userProfiles } from '../../shared/schema';
import { AppConfig } from '../../shared/types';
import {
  getAppConfigProperty,
  setAppConfigProperty,
} from '../services/appConfig';
import { appConfigPath } from './constants';
import { db, runMigrations } from './database';
import { count } from 'drizzle-orm';
import fs from 'fs';

export const initializeConfigAndDatabase = async (): Promise<void> => {
  if (!fs.existsSync(appConfigPath)) {
    const defaultConfig: AppConfig = {
      activeProfile: '',
      activeProfileSchedule: 'null',
      firstDayOfweek: 0,
    };
    fs.writeFileSync(appConfigPath, JSON.stringify(defaultConfig, null, 2));
    console.info(
      `INFO: Config file is not found. Default config file created at ${appConfigPath}.`,
    );
  }

  await runMigrations();

  // Check if the default user profile exists, and create it if it doesn't.
  const [{ value: userProfilesCount }] = await db
    .select({ value: count() })
    .from(userProfiles);

  if (userProfilesCount === 0) {
    const [{ id }] = await db
      .insert(userProfiles)
      .values({ displayName: 'Default', avatar: null })
      .returning({ id: userProfiles.id });

    // Set current active profile to the newly created user profile
    await setAppConfigProperty('activeProfile', id);
    console.info(
      'INFO: Default user profile created and set as current active profile.',
    );
  } else {
    const currentActiveProfile = getAppConfigProperty('activeProfile');
    // Check available user profiles in database
    // if current active profile's id is not in database
    // set to anything that's available in db
    const availableUserProfiles = await db
      .select({ id: userProfiles.id })
      .from(userProfiles);

    const availableUserProfileIds = availableUserProfiles.map(
      (profile) => profile.id,
    );
    if (
      !currentActiveProfile ||
      !availableUserProfileIds.includes(currentActiveProfile)
    ) {
      await setAppConfigProperty('activeProfile', availableUserProfileIds[0]);
      console.info(
        'INFO: Current active profile does not match anything in the database, syncing them now.',
      );
    }
  }

  const [{ value: scheduleProfileCount }] = await db
    .select({ value: count() })
    .from(scheduleProfiles);

  if (scheduleProfileCount === 0) {
    const currentActiveUserProfileId = getAppConfigProperty('activeProfile');

    const [{ id }] = await db
      .insert(scheduleProfiles)
      .values({
        name: 'Default',
        userId: currentActiveUserProfileId,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      })
      .returning({ id: scheduleProfiles.id });

    await setAppConfigProperty('activeProfileSchedule', id);
    console.info(
      'INFO: Default user schedule profile created and set as current active schedule profile.',
    );
  } else {
    const currentActiveProfile = getAppConfigProperty('activeProfile');
    // Check available schedule profiles in database
    // if current active scedule profile's id is not in database
    // set to anything that's available in db
    const availableScheduleProfiles = await db
      .select({ id: scheduleProfiles.id })
      .from(scheduleProfiles);

    const availableScheduleProfileIds = availableScheduleProfiles.map(
      (profile) => profile.id,
    );
    if (
      !currentActiveProfile ||
      !availableScheduleProfileIds.includes(currentActiveProfile)
    ) {
      await setAppConfigProperty(
        'activeProfileSchedule',
        availableScheduleProfileIds[0],
      );
      console.info(
        'INFO: Current active profile schedule does not match anything in the database, syncing them now.',
      );
    }
  }
};
