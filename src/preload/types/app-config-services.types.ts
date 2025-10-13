import { AppConfig } from '../../shared/types';

type AppConfigKey = keyof AppConfig;

type AppConfigValue<K extends AppConfigKey> = AppConfig[K];

type GetAppConfig = <K extends AppConfigKey>(key: K) => AppConfigValue<K>;

type SetAppConfig = <K extends AppConfigKey>(
  key: K,
  value: AppConfigValue<K>,
) => void;

type OnChangeCallback<K extends AppConfigKey> = (
  newValue: AppConfigValue<K>,
) => void;

type OnChange = <K extends AppConfigKey>(
  key: K,
  callback: OnChangeCallback<K>,
) => () => void;

export interface AppConfigServices {
  get: GetAppConfig;
  set: SetAppConfig;
  onChange: OnChange;
}
