import { NewScheduleProfile, ScheduleProfile } from '../../shared/types';

export type GetScheduleProfilesByUser = (
  userId: ScheduleProfile['userId'],
) => Promise<ScheduleProfile[]>;

export type CreateScheduleProfile = (
  data: NewScheduleProfile,
) => Promise<ScheduleProfile[]>;

export type UpdateScheduleProfile = (
  id: ScheduleProfile['id'],
  data: Partial<NewScheduleProfile>,
) => Promise<ScheduleProfile[]>;

export type DeleteScheduleProfile = (
  id: ScheduleProfile['id'],
) => Promise<{ id: ScheduleProfile['id'] }[]>;

export interface ScheduleProfilesServices {
  getByUser: GetScheduleProfilesByUser;
  create: CreateScheduleProfile;
  update: UpdateScheduleProfile;
  delete: DeleteScheduleProfile;
}
