import { AppConfig } from '../../shared/types';
import { appConfigFile } from '../lib/constants';
import { app, BrowserWindow } from 'electron';
import fs from 'fs-extra';
import path from 'path';

/** The absolute path to the application's JSON configuration file. */
const configFilePath = path.join(app.getPath('userData'), appConfigFile);

/**
 * An in-memory cache of the application's configuration. It is loaded
 * from the disk once when the module is initialized.
 */
let appConfig: AppConfig;

/**
 * Creates a default configuration object for the application. This is used
 * when the application is run for the first time or if the existing
 * configuration file is corrupted or unreadable.
 */
const createDefaultConfig = (): AppConfig => ({
  activeProfile: '',
  activeProfileSchedule: '',
  firstDayOfweek: 0,
  userTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
});

/** On startup, attempt to read the config file from disk. */
try {
  appConfig = fs.readJSONSync(configFilePath, {
    encoding: 'utf-8',
  }) as AppConfig;
} catch (error: unknown) {
  console.warn(
    `WARN: Could not read or parse config.json. Resetting to default. The error was: "${(error as Error).message}".`,
  );
  // If reading fails, create a new default config and write it to disk.
  appConfig = createDefaultConfig();
  fs.writeJSONSync(configFilePath, appConfig, { spaces: 2 });
}

/**
 * Synchronously retrieves the entire application configuration object
 * from the in-memory cache.
 */
export const getAppConfig = (): AppConfig => appConfig;

/**
 * Synchronously retrieves a single property's value from the in-memory
 * application configuration.
 */
export const getAppConfigProperty = <K extends keyof AppConfig>(
  key: K,
): AppConfig[K] => {
  const config = getAppConfig();
  return config[key];
};

/**
 * Asynchronously updates a single property in the application's configuration.
 * It first updates the in-memory cache, then persists the entire configuration
 * object to the disk. Finally, it notifies all renderer processes of the change
 * via an IPC message.
 */
export const setAppConfigProperty = async <
  K extends keyof AppConfig,
  V extends AppConfig[K],
>(
  key: K,
  value: V,
): Promise<void> => {
  // Update the in-memory cache
  appConfig[key] = value;

  // Persist the changes to disk
  try {
    await fs.writeJSON(configFilePath, appConfig, { spaces: 2 });
  } catch (error) {
    console.error('Failed to write app config to disk:', error);
  }

  // Notify all windows of the change
  BrowserWindow.getAllWindows().forEach((window) => {
    window.webContents.send('app-config-changed', key, value);
  });
};
