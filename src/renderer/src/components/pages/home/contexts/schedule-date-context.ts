import { createContext } from 'react';

type ScheduleDateContextType = { date: Date; setDate: (date?: Date) => void };

export const ScheduleDateContext =
  createContext<ScheduleDateContextType | null>(null);
