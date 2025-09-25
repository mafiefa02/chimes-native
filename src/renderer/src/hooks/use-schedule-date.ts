import { ScheduleDateContext } from '../contexts/schedule-date-context';
import { useContext } from 'react';

export const useScheduleDate = () => {
  const context = useContext(ScheduleDateContext);

  if (!context) {
    throw new Error(
      'useScheduleDate must be used within a ScheduleDateProvider',
    );
  }

  return context;
};
