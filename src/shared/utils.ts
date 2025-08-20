import fs from 'fs';
import path from 'path';

export const isDev = process.env.NODE_ENV === 'development';

export const ensureDirExists = (filePath: string) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return filePath;
};

export const getDataPath = (appDataPath: string) => {
  const dataPath = isDev
    ? path.resolve('data')
    : path.join(appDataPath, 'data');
  return ensureDirExists(dataPath);
};

export const getAppConfigPath = (appDataPath: string) => {
  const configFileName = 'config.json';
  const appConfigPath = path.join(getDataPath(appDataPath), configFileName);
  return appConfigPath;
};

export const getDbPath = (appDataPath: string) => {
  const dbFileName = 'chimes.db';
  const dbPath = path.join(getDataPath(appDataPath), dbFileName);
  return dbPath;
};

export const getDefaultSoundPath = (appDataPath: string) => {
  const configFileName = 'bell.mp3';
  const soundPath = path.join(getDataPath(appDataPath), configFileName);
  return soundPath;
};

export const capitalize = (sentence: string) => {
  if (!sentence) return '';
  return sentence
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
