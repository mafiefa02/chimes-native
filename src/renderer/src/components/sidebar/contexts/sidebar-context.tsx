import { ReactNode, useState } from 'react';
import { SidebarContext } from './sidebar';

type SidebarProviderProps = { children: ReactNode };

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};
