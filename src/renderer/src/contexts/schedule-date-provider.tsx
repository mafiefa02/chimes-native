import { ScheduleDateContext } from './schedule-date-context';
import { useState } from 'react';

export const ScheduleDateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [date, setDate] = useState(new Date());
  return (
    <ScheduleDateContext.Provider value={{ date, setDate }}>
      {children}
    </ScheduleDateContext.Provider>
  );
};
