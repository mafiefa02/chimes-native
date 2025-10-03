import { NewScheduleProfile, ScheduleProfile } from '../../shared/types';

type GetScheduleProfilesByUser = (
  userId: ScheduleProfile['userId'],
) => Promise<ScheduleProfile[]>;

type CreateScheduleProfile = (
  data: NewScheduleProfile,
) => Promise<ScheduleProfile[]>;

type UpdateScheduleProfile = (
  id: ScheduleProfile['id'],
  data: Partial<NewScheduleProfile>,
) => Promise<ScheduleProfile[]>;

type DeleteScheduleProfile = (
  id: ScheduleProfile['id'],
) => Promise<{ id: ScheduleProfile['id'] }[]>;

export type ScheduleProfilesServices = {
  getByUser: GetScheduleProfilesByUser;
  create: CreateScheduleProfile;
  update: UpdateScheduleProfile;
  delete: DeleteScheduleProfile;
};
