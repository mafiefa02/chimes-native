import { createContext, Dispatch, SetStateAction } from 'react';

type PreviewProfileIdContextType = {
  previewProfileId: string;
  setPreviewProfileId: Dispatch<SetStateAction<string>>;
};

export const PreviewProfileIdContext =
  createContext<PreviewProfileIdContextType | null>(null);
