import { AppConfig } from '../../shared/types';
import { appConfigFile } from '../lib/constants';
import { app, BrowserWindow } from 'electron';
import fs from 'fs-extra';
import path from 'path';

const configFilePath = path.join(app.getPath('userData'), appConfigFile);

let appConfig: AppConfig;

const createDefaultConfig = (): AppConfig => ({
  activeProfile: '',
  activeProfileSchedule: '',
  firstDayOfweek: 0,
  userTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
});

try {
  appConfig = fs.readJSONSync(configFilePath, {
    encoding: 'utf-8',
  }) as AppConfig;
} catch (error: unknown) {
  console.warn(
    `WARN: Could not read or parse config.json. Resetting to default. The error was: "${(error as Error).message}".`,
  );
  // If reading or parsing fails, create a new default config
  appConfig = createDefaultConfig();
  fs.writeJSONSync(configFilePath, appConfig, { spaces: 2 });
}

export const getAppConfig = (): AppConfig => appConfig;

export const getAppConfigProperty = <K extends keyof AppConfig>(
  key: K,
): AppConfig[K] => {
  const config = getAppConfig();
  return config[key];
};

export const setAppConfigProperty = async <
  K extends keyof AppConfig,
  V extends AppConfig[K],
>(
  key: K,
  value: V,
): Promise<void> => {
  appConfig[key] = value;

  try {
    await fs.writeJSON(configFilePath, appConfig, { spaces: 2 });
  } catch (error) {
    console.error('Failed to write app config to disk:', error);
  }

  BrowserWindow.getAllWindows().forEach((window) => {
    window.webContents.send('app-config-changed', key, value);
  });
};
