import { createContext } from 'react';

type ScheduleDateContextType = {
  date: Date;
  setDate: (date?: Date) => void;
  startOfDay: Date;
  endOfDay: Date;
};

export const ScheduleDateContext =
  createContext<ScheduleDateContextType | null>(null);
