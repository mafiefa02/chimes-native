import { AppConfig } from '../../shared/types';

export type AppConfigKey = keyof AppConfig;
export type AppConfigValue<K extends AppConfigKey> = AppConfig[K];

export type GetAppConfig = <K extends AppConfigKey>(
  key: K,
) => AppConfigValue<K>;

export type SetAppConfig = <K extends AppConfigKey>(
  key: K,
  value: AppConfigValue<K>,
) => Promise<void>;

export type OnChangeAppConfig = <K extends AppConfigKey>(
  key: K,
  callback: (newValue: AppConfigValue<K>) => void,
) => () => void;

export interface AppConfigServices {
  get: GetAppConfig;
  set: SetAppConfig;
  onChange: OnChangeAppConfig;
}
