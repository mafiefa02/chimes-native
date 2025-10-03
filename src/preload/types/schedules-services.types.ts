import { NewSchedule, Schedule } from '../../shared/types';

type GetSchedulesByProfile = (
  profileId: Schedule['profileId'],
) => Promise<Schedule[]>;

type CreateSchedule = (data: NewSchedule) => Promise<Schedule[]>;

type UpdateSchedule = (
  id: Schedule['id'],
  data: Partial<NewSchedule>,
) => Promise<Schedule[]>;

type DeleteSchedule = (id: Schedule['id']) => Promise<{ id: Schedule['id'] }[]>;

export interface SchedulesServices {
  getByProfile: GetSchedulesByProfile;
  create: CreateSchedule;
  update: UpdateSchedule;
  delete: DeleteSchedule;
}
