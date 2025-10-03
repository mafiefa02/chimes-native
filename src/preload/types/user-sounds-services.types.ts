import { NewUserSound, UserSound } from '../../shared/types';

export type GetUserSoundsByUser = (
  userId: UserSound['userId'],
) => Promise<UserSound[]>;

export type GetUserSoundBySoundId = (
  userId: UserSound['userId'],
  soundId: UserSound['id'],
) => Promise<UserSound | undefined>;

export type CreateUserSound = (data: NewUserSound) => Promise<UserSound[]>;

export type UpdateUserSound = (
  id: UserSound['id'],
  userId: UserSound['userId'],
  data: Partial<NewUserSound>,
) => Promise<UserSound[]>;

export type DeleteUserSound = (
  id: UserSound['id'],
  userId: UserSound['userId'],
) => Promise<{ id: UserSound['id'] }[]>;

export interface UserSoundsServices {
  getByUser: GetUserSoundsByUser;
  getBySoundId: GetUserSoundBySoundId;
  create: CreateUserSound;
  update: UpdateUserSound;
  delete: DeleteUserSound;
}
