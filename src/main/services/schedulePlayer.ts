import { defaultSoundFile } from '../lib/constants';
import { playAudioFile } from '../lib/utils';
import { getAppConfigProperty } from './appConfig';
import * as scheduleServices from './schedules';
import * as userSoundsServices from './userSounds';
import { app, Notification } from 'electron';
import { join } from 'path';

const EVERY_MINUTE = 60 * 1000;
const appSoundsPath = app.isPackaged
  ? join(process.resourcesPath, 'public', 'sounds')
  : join(app.getAppPath(), 'public', 'sounds');

const checkSchedules = async () => {
  const now = new Date();
  const currentDay = now.getUTCDay();
  const currentTime = `${String(now.getUTCHours()).padStart(2, '0')}:${String(
    now.getUTCMinutes(),
  ).padStart(2, '0')}`;
  const currentProfile = getAppConfigProperty('activeProfileSchedule');

  const activeSchedules =
    await scheduleServices.getAllActiveSchedules(currentProfile);

  for (const schedule of activeSchedules) {
    const isToday = schedule.triggerDays.includes(currentDay);
    const isTime = schedule.triggerTime === currentTime;
    const scheduleSound = await userSoundsServices.getUserSoundById(
      currentProfile,
      schedule.soundId,
    );

    const soundPath = join(
      appSoundsPath,
      scheduleSound ? scheduleSound.filePath : defaultSoundFile,
    );

    if (isToday && isTime) {
      playAudioFile(soundPath);
      new Notification({
        title: 'Chimes',
        body: `It's time for your "${schedule.name}" schedule!`,
      }).show();
    }
  }
};

export const start = () => {
  const now = new Date();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();
  const delay = (60 - seconds) * 1000 - milliseconds;
  setTimeout(() => {
    console.log('Clock synced. Running first schedule check.');
    checkSchedules();
    setInterval(checkSchedules, EVERY_MINUTE);
  }, delay);
};
