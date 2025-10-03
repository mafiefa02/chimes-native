import { NewUserSound, UserSound } from '../../shared/types';

type GetUserSoundsByUser = (
  userId: UserSound['userId'],
) => Promise<UserSound[]>;

type GetUserSoundBySoundId = (
  userId: UserSound['userId'],
  soundId: UserSound['id'],
) => Promise<UserSound | undefined>;

type CreateUserSound = (data: NewUserSound) => Promise<UserSound[]>;

type UpdateUserSound = (
  id: UserSound['id'],
  userId: UserSound['userId'],
  data: Partial<NewUserSound>,
) => Promise<UserSound[]>;

type DeleteUserSound = (
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
