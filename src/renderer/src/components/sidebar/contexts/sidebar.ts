import { createContext } from 'react';

export type SidebarContextProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  isSmallScreen: boolean;
};

export const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined,
);
