import { NewUserProfile, UserProfile } from '../../shared/types';

type GetAllProfiles = () => Promise<UserProfile[]>;

type GetProfileById = (
  id: UserProfile['id'],
) => Promise<UserProfile | undefined>;

type CreateProfile = (data: NewUserProfile) => Promise<UserProfile[]>;

type UpdateProfile = (
  id: UserProfile['id'],
  data: Partial<NewUserProfile>,
) => Promise<UserProfile[]>;

type DeleteProfile = (
  id: UserProfile['id'],
) => Promise<{ id: UserProfile['id'] }[]>;

export interface ProfilesServices {
  getAll: GetAllProfiles;
  getById: GetProfileById;
  create: CreateProfile;
  update: UpdateProfile;
  delete: DeleteProfile;
}
