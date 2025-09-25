import { ScheduleDateContext } from './schedule-date-context';
import { useMemo, useState } from 'react';

export const ScheduleDateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const value = useMemo(() => {
    const d = date || new Date();
    return { date: d, setDate };
  }, [date]);

  return (
    <ScheduleDateContext.Provider value={value}>
      {children}
    </ScheduleDateContext.Provider>
  );
};
