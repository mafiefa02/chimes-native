import { NewUserProfile, UserProfile } from '../../shared/types';

export type GetAllProfiles = () => Promise<UserProfile[]>;

export type GetProfileById = (
  id: UserProfile['id'],
) => Promise<UserProfile | undefined>;

export type CreateProfile = (data: NewUserProfile) => Promise<UserProfile[]>;

export type UpdateProfile = (
  id: UserProfile['id'],
  data: Partial<NewUserProfile>,
) => Promise<UserProfile[]>;

export type DeleteProfile = (
  id: UserProfile['id'],
) => Promise<{ id: UserProfile['id'] }[]>;

export interface ProfilesServices {
  getAll: GetAllProfiles;
  getById: GetProfileById;
  create: CreateProfile;
  update: UpdateProfile;
  delete: DeleteProfile;
}
