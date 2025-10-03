import { NewSchedule, Schedule } from '../../shared/types';

export type GetSchedulesByProfile = (
  profileId: Schedule['profileId'],
) => Promise<Schedule[]>;

export type CreateSchedule = (data: NewSchedule) => Promise<Schedule[]>;

export type UpdateSchedule = (
  id: Schedule['id'],
  data: Partial<NewSchedule>,
) => Promise<Schedule[]>;

export type DeleteSchedule = (
  id: Schedule['id'],
) => Promise<{ id: Schedule['id'] }[]>;

export interface SchedulesServices {
  getByProfile: GetSchedulesByProfile;
  create: CreateSchedule;
  update: UpdateSchedule;
  delete: DeleteSchedule;
}
