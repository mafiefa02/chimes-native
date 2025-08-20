import { useDebounce } from '../../../hooks/use-debounce';
import { useMediaQuery } from '../../../hooks/use-media-query';
import { SidebarContext } from './sidebar';
import { ReactNode, useEffect, useState } from 'react';

type SidebarProviderProps = { children: ReactNode };

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const isSmallScreen = useDebounce(useMediaQuery('(max-width: 1024px)'));
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    setIsSidebarOpen(!isSmallScreen);
  }, [isSmallScreen]);

  return (
    <SidebarContext.Provider
      value={{ isSidebarOpen, setIsSidebarOpen, isSmallScreen }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
