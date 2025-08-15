import { UserProfile } from '../../shared/types';

export interface IServices {
  profiles: { getAll: () => Promise<UserProfile[]> };
}
