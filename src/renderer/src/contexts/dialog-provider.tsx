import { DialogContext } from './dialog-context';
import { useState, useMemo } from 'react';

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const value = useMemo(
    () => ({ isDialogOpen, openDialog, closeDialog }),
    [isDialogOpen],
  );

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
};
