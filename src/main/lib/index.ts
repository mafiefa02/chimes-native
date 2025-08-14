import { APP_NAME } from '../../shared/contants';
import { homedir } from 'os';

export const getRootDir = () => {
  return `${homedir()}/${APP_NAME}`;
};

export const getSchedules = () => {};
