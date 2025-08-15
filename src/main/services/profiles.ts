import { UserProfile } from '../../shared/types';
import { db } from '../lib/database';

export const getAllProfiles = async (): Promise<UserProfile[]> => {
  const data = await db.query.userProfiles.findMany();
  return data;
};
