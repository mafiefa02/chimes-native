import { DialogContext } from '../contexts/dialog-context';
import { useContext } from 'react';

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};
