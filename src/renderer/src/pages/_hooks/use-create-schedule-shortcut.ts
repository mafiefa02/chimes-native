import { useDialog } from '../../hooks/use-dialog';
import { useEffect } from 'react';

export const useCreateScheduleShortcut = () => {
  const { openDialog } = useDialog();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.isContentEditable ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        return;
      }

      if (e.metaKey && e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        openDialog();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openDialog]);
};
