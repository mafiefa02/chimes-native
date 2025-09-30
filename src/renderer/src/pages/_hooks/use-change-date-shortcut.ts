import { useScheduleDate } from '../../hooks/use-schedule-date';
import { addDays, subDays } from 'date-fns';
import { useEffect } from 'react';

export const useChangeDateShortcut = () => {
  const { date, setDate } = useScheduleDate();
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

      if (e.metaKey) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          e.stopPropagation();
          setDate(subDays(date ?? new Date(), 1));
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          e.stopPropagation();
          setDate(addDays(date ?? new Date(), 1));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [date, setDate]);
};
