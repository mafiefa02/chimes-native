import { AppConfig } from '../../shared/types';

type AppConfigKey = keyof AppConfig;

type AppConfigValue<K extends AppConfigKey> = AppConfig[K];

type GetAppConfig = <K extends AppConfigKey>(key: K) => AppConfigValue<K>;

type SetAppConfig = <K extends AppConfigKey>(
  key: K,
  value: AppConfigValue<K>,
) => Promise<void>;

type OnChangeAppConfig = <K extends AppConfigKey>(
  key: K,
  callback: (newValue: AppConfigValue<K>) => void,
) => () => void;

export interface AppConfigServices {
  get: GetAppConfig;
  set: SetAppConfig;
  onChange: OnChangeAppConfig;
}
