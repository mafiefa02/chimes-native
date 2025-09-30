import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { useSidebar } from './hooks/use-sidebar';
import { ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

export const SidebarToggle = () => {
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

  return (
    <Button
      size="icon"
      className="absolute top-1/2 -right-2 pr-1.5"
      variant="outline"
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
    >
      <ChevronRight
        className={cn(
          'transition-transform ease-in-out',
          isSidebarOpen && 'rotate-180',
        )}
      />
    </Button>
  );
};
