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

export const capitalize = (sentence: string) => {
  if (!sentence) return '';
  return sentence
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
