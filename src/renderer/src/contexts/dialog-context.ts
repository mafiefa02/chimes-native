import { createContext } from 'react';

type DialogContextType = {
  isDialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
};

export const DialogContext = createContext<DialogContextType | undefined>(
  undefined,
);
