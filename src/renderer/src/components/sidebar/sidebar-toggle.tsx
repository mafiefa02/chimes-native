import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { useSidebar } from './hooks/use-sidebar';
import { ChevronRight } from 'lucide-react';

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
