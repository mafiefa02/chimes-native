import { AppConfig } from '../../shared/types';
import { appConfigFile } from '../lib/constants';
import { app, BrowserWindow } from 'electron';
import fs from 'fs-extra';
import path from 'path';

/**
 * Manages the application's configuration, handling reading from and writing to
 * the user's data directory. This class follows a singleton pattern, with a
 * single instance exported for application-wide use.
 */
export class AppConfigServices {
  /** The absolute path to the application's JSON configuration file. */
  private readonly configFilePath: string;

  /** An in-memory cache of the application's configuration. */
  private appConfig: AppConfig;

  constructor() {
    this.configFilePath = path.join(app.getPath('userData'), appConfigFile);
    this.appConfig = this._loadConfig();
  }

  /**
   * Creates a default configuration object. This is used when the application
   * is run for the first time or if the config file is corrupted.
   */
  private _createDefaultConfig = (): AppConfig => ({
    activeProfile: '',
    activeProfileSchedule: '',
  });

  /**
   * Loads the configuration from the disk into the in-memory cache.
   * If the file doesn't exist or is invalid, it creates a default config.
   */
  private _loadConfig(): AppConfig {
    let config: AppConfig;

    try {
      config = fs.readJSONSync(this.configFilePath, {
        encoding: 'utf-8',
      }) as AppConfig;
    } catch (error: unknown) {
      console.warn(
        `WARN: Could not read or parse config.json. Resetting to default. The error was: "${
          (error as Error).message
        }".`,
      );
      // If reading fails, create a new default config and write it to disk.
      config = this._createDefaultConfig();
      fs.writeJSONSync(this.configFilePath, config, { spaces: 2 });
    }

    return config;
  }

  /**
   * Asynchronously persists the current in-memory configuration to the disk.
   */
  private async _saveConfig(): Promise<void> {
    try {
      await fs.writeJSON(this.configFilePath, this.appConfig, { spaces: 2 });
    } catch (error) {
      console.error('Failed to write app config to disk:', error);
    }
  }

  /**
   * Synchronously retrieves the entire application configuration object
   * from the in-memory cache.
   */
  public get = (): AppConfig => this.appConfig;

  /**
   * Synchronously retrieves a single property's value from the in-memory
   * application configuration.
   */
  public getProperty = <K extends keyof AppConfig>(key: K): AppConfig[K] => {
    return this.appConfig[key];
  };

  /**
   * Asynchronously updates a single property in the application's configuration.
   * It updates the cache, persists the changes to disk, and notifies all
   * renderer processes of the change.
   */
  public setProperty = async <
    K extends keyof AppConfig,
    V extends AppConfig[K],
  >(
    key: K,
    value: V,
  ): Promise<void> => {
    // Update the in-memory cache
    this.appConfig[key] = value;

    // Persist the changes to disk
    await this._saveConfig();

    // Notify all windows of the change
    BrowserWindow.getAllWindows().forEach((window) => {
      window.webContents.send('app-config-changed', key, value);
    });
  };
}

/**
 * A singleton instance of the AppConfigServices class.
 * This should be used throughout the application to access and manage configuration.
 */
export const appConfigServices = new AppConfigServices();
