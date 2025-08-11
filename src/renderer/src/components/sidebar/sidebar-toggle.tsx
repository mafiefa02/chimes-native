import { ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@renderer/lib/utils';
import { useSidebar } from './hooks/use-sidebar';

export const SidebarToggle = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
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
