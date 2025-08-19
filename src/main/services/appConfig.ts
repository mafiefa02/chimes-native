import { AppConfig } from '../../shared/types';
import { appConfigPath } from '../lib/constants';
import fs from 'fs-extra';

const getConfig = () => {
  const config = fs.readJSONSync(appConfigPath);
  return config as AppConfig;
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
  fs.writeJSON(appConfigPath, config, { spaces: 2 });
};
