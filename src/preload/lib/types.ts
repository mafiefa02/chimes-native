import { INote } from '../../shared/types';

export interface ICustomAPI {
  notes: { getAll: () => Promise<{ data?: INote[]; error?: string }> };
}
