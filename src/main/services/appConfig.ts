import { AppConfig } from '../../shared/types';
import { appConfigPath } from '../lib/constants';
import fs from 'fs-extra';

const createDefaultConfig = (): AppConfig => ({
  activeProfile: '',
  activeProfileSchedule: '',
  firstDayOfweek: 0,
  userTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
});

const getConfig = (): AppConfig => {
  try {
    const config = fs.readJSONSync(appConfigPath, { encoding: 'utf-8' });
    return config as AppConfig;
  } catch (error: unknown) {
    console.warn(
      `WARN: Could not read config.json. It might be corrupted or missing. Resetting to default.\nError: ${(error as Error).message}`,
    );
    // If reading or parsing fails, create a new default config
    const defaultConfig = createDefaultConfig();
    fs.writeJSONSync(appConfigPath, defaultConfig, { spaces: 2 });
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
  await fs.writeJSON(appConfigPath, config, { spaces: 2 });
};
