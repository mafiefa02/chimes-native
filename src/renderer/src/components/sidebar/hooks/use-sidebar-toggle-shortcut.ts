import { useSidebar } from './use-sidebar';
import { useEffect } from 'react';

export const useSidebarToggleShortcut = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isShortcutPressed =
        event.shiftKey && (event.metaKey || event.ctrlKey) && event.key === 'k';

      if (isShortcutPressed) {
        event.preventDefault();
        setIsSidebarOpen(!isSidebarOpen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSidebarOpen, setIsSidebarOpen]);
};
