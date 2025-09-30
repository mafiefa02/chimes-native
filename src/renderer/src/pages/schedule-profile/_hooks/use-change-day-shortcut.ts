import { Dispatch, SetStateAction, useEffect } from 'react';

export const useChangeDayShortcut = (
  setSelectedDay: Dispatch<SetStateAction<number>>,
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey) {
        let shouldPreventDefault = false;

        if (event.key === 'ArrowRight') {
          setSelectedDay((prevDay) => (prevDay % 7) + 1);
          shouldPreventDefault = true;
        } else if (event.key === 'ArrowLeft') {
          setSelectedDay((prevDay) => (prevDay === 1 ? 7 : prevDay - 1));
          shouldPreventDefault = true;
        }

        if (shouldPreventDefault) {
          event.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setSelectedDay]);
};
