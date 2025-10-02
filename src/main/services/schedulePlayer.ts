import { filterActiveSchedules } from '../../shared/utils';
import { defaultSoundFile } from '../lib/constants';
import { playAudioFile } from '../lib/utils';
import { getAppConfigProperty } from './appConfig';
import * as scheduleServices from './schedules';
import * as userSoundsServices from './userSounds';
import { getISODay } from 'date-fns';
import { app } from 'electron';
import { join } from 'path';

const EVERY_MINUTE = 60 * 1000;

/**
 * The absolute path to the application's packaged sound files. It dynamically
 * resolves the path based on whether the app is running in a packaged
 * production environment or in development.
 */
const appSoundsPath = app.isPackaged
  ? join(process.resourcesPath, 'public', 'sounds')
  : join(app.getAppPath(), 'public', 'sounds');

/**
 * The core function of the scheduler. It runs every minute to check for schedules
 * that should be triggered. It compares the current UTC time and day against all
 * active schedules for the current profile. If a schedule matches the current time,
 * its associated sound is located and played.
 */
const checkSchedules = async () => {
  const now = new Date();
  const currentDay = getISODay(now);
  // Compare time in UTC to ensure consistency across different timezones
  const currentTime = `${String(now.getUTCHours()).padStart(2, '0')}:${String(
    now.getUTCMinutes(),
  ).padStart(2, '0')}`;
  const currentProfile = getAppConfigProperty('activeProfileSchedule');

  const activeSchedules =
    await scheduleServices.getAllActiveSchedules(currentProfile);

  const activeSchedulesForToday = activeSchedules.filter((schedule) =>
    filterActiveSchedules(schedule, now),
  );

  for (const schedule of activeSchedulesForToday) {
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

    if (isToday && isTime && schedule.isActive) {
      playAudioFile(soundPath);
    }
  }
};

/**
 * Initializes and starts the schedule player service. To ensure accuracy, it
 * calculates the precise delay until the beginning of the next minute, runs an
 * initial check, and then sets up a recurring interval to check for schedules
 * every minute thereafter.
 */
export const start = () => {
  const now = new Date();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();

  // Calculate the time remaining until the next minute starts
  const delay = (60 - seconds) * 1000 - milliseconds;

  setTimeout(() => {
    console.log('Clock synced. Running first schedule check.');
    checkSchedules();
    setInterval(checkSchedules, EVERY_MINUTE);
  }, delay);
};
