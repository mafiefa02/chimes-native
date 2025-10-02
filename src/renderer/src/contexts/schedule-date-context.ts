import { createContext, Dispatch, SetStateAction } from 'react';

type ScheduleDateContextType = {
  date: Date;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
};

export const ScheduleDateContext =
  createContext<ScheduleDateContextType | null>(null);
