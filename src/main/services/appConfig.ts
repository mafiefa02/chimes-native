import { AppConfig } from '../../shared/types';
import { appConfigFile } from '../lib/constants';
import { app, BrowserWindow } from 'electron';
import fs from 'fs-extra';
import path from 'path';

const configFilePath = path.join(app.getPath('userData'), appConfigFile);
const createDefaultConfig = (): AppConfig => ({
  activeProfile: '',
  activeProfileSchedule: '',
  firstDayOfweek: 0,
  userTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
});

const getConfig = (): AppConfig => {
  try {
    const config = fs.readJSONSync(configFilePath, { encoding: 'utf-8' });
    return config as AppConfig;
  } catch (error: unknown) {
    console.warn(
      `WARN: Could not read or parse config.json. It might be corrupted or missing. Resetting to default. The error was: "${(error as Error).message}".`,
    );
    // If reading or parsing fails, create a new default config
    const defaultConfig = createDefaultConfig();
    fs.writeJSONSync(configFilePath, defaultConfig, { spaces: 2 });
    return defaultConfig;
  }
};

export const getAppConfigProperty = <K extends keyof AppConfig>(
  key: K,
): AppConfig[K] => {
  const config = getConfig();
  return config[key];
};

export const setAppConfigProperty = async <
  K extends keyof AppConfig,
  V extends AppConfig[K],
>(
  key: K,
  value: V,
): Promise<void> => {
  const config = getConfig();
  config[key] = value;
  await fs.writeJSON(configFilePath, config, { spaces: 2 });
  BrowserWindow.getAllWindows().forEach((window) => {
    window.webContents.send('app-config-changed', key, value);
  });
};
