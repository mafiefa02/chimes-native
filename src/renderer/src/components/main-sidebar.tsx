import {
  Box,
  Calendar,
  ChevronLeft,
  HomeIcon,
  Music,
  Settings,
} from 'lucide-react';
import { Button } from '@renderer/components/ui/button';

export const MainSidebar = () => {
  return (
    <nav className="relative grid grid-rows-[auto_1fr_auto] px-6 pb-4">
      <h1 className="py-4 text-center text-xl font-bold">Chimes</h1>
      {/* TODO: implement side navigation bar */}
      <div className="flex min-w-48 flex-col gap-4 py-4">
        {contents.map((content) => (
          <Button
            key={content.label}
            className="justify-start"
            size="sm"
            variant="ghost"
          >
            <content.icon className="size-4" />
            <p>{content.label}</p>
          </Button>
        ))}
      </div>
      {/* TODO: implement application status */}
      <Button
        variant="outline"
        className="justify-start"
      >
        Tes
      </Button>
      {/* TODO: implement collapsible sidebar */}
      <Button
        size="icon"
        className="absolute top-1/2 -right-5"
        variant="outline"
      >
        <ChevronLeft />
      </Button>
    </nav>
  );
};

const contents = [
  { icon: HomeIcon, label: 'Home' },
  { icon: Calendar, label: 'Schedule Profile' },
  { icon: Music, label: 'Sounds' },
  { icon: Settings, label: 'Settings' },
  { icon: Box, label: 'Extensions' },
];
