
import { createContext, useContext, useState, useMemo } from 'react';

type AddScheduleDialogContextType = {
  isDialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
};

const AddScheduleDialogContext = createContext<
  AddScheduleDialogContextType | undefined
>(undefined);

export const AddScheduleDialogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const value = useMemo(
    () => ({
      isDialogOpen,
      openDialog,
      closeDialog,
    }),
    [isDialogOpen],
  );

  return (
    <AddScheduleDialogContext.Provider value={value}>
      {children}
    </AddScheduleDialogContext.Provider>
  );
};

export const useAddScheduleDialog = () => {
  const context = useContext(AddScheduleDialogContext);
  if (context === undefined) {
    throw new Error(
      'useAddScheduleDialog must be used within a AddScheduleDialogProvider',
    );
  }
  return context;
};
