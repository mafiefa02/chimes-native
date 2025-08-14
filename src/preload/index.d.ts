import { ElectronAPI } from '@electron-toolkit/preload';

export interface INote {
  id: number;
  title: string;
  content: string | null;
}

export interface ICustomAPI {
  notes: { getAll: () => Promise<{ data?: INote[]; error?: string }> };
}

declare global {
  interface Window {
    electron: ElectronAPI;
    api: ICustomAPI;
  }
}
