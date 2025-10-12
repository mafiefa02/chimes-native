import { filterActiveSchedules } from '../../shared/utils';
import { defaultSoundFile } from '../lib/constants';
import { playAudioFile } from '../lib/utils';
import { services } from './index';
import { tz } from '@date-fns/tz';
import { format, getISODay } from 'date-fns';
import { app } from 'electron';
import { join } from 'path';

const EVERY_MINUTE = 60 * 1000;

/**
 * Provides the core scheduling functionality, checking for and triggering
 * scheduled events at regular intervals.
 */
export class SchedulePlayerServices {
  /**
   * The absolute path to the application's packaged sound files. It dynamically
   * resolves the path based on whether the app is running in a packaged
   * production environment or in development.
   */
  private readonly appSoundsPath: string;

  constructor() {
    this.appSoundsPath = app.isPackaged
      ? join(process.resourcesPath, 'public', 'sounds')
      : join(app.getAppPath(), 'public', 'sounds');
  }

  /**
   * The core function of the scheduler. It runs every minute to check for schedules
   * that should be triggered. It compares the current UTC time and day against all
   * active schedules for the current profile. If a schedule matches the current time,
   * its associated sound is located and played.
   */
  private async checkSchedules() {
    const now = new Date();
    const currentDay = getISODay(now);
    // Compare time in UTC to ensure consistency across different timezones
    const currentTime = format(now, 'HH:mm', { in: tz('Etc/UTC') });
    const currentProfile = services.appConfig.getProperty(
      'activeProfileSchedule',
    );

    const activeSchedules =
      await services.schedule.getAllActive(currentProfile);

    const activeSchedulesForToday = activeSchedules.filter((schedule) =>
      filterActiveSchedules(schedule, now),
    );

    for (const schedule of activeSchedulesForToday) {
      const isToday = schedule.triggerDays.includes(currentDay);
      const isTime = schedule.triggerTime === currentTime;
      const scheduleSound = await services.userSound.getById(
        currentProfile,
        schedule.soundId,
      );

      const soundPath = join(
        this.appSoundsPath,
        scheduleSound ? scheduleSound.filePath : defaultSoundFile,
      );

      if (isToday && isTime && schedule.isActive) {
        playAudioFile(soundPath);
      }
    }
  }

  /**
   * Initializes and starts the schedule player service. To ensure accuracy, it
   * calculates the precise delay until the beginning of the next minute, runs an
   * initial check, and then sets up a recurring interval to check for schedules
   * every minute thereafter.
   */
  public start() {
    const now = new Date();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    // Calculate the time remaining until the next minute starts
    const delay = (60 - seconds) * 1000 - milliseconds;

    setTimeout(() => {
      this.checkSchedules();
      setInterval(() => this.checkSchedules(), EVERY_MINUTE);
    }, delay);
  }
}

export const schedulePlayerServices = new SchedulePlayerServices();
