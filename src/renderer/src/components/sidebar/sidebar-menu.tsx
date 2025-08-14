import { Button } from '../ui/button';
import { useSidebar } from './hooks/use-sidebar';
import {
  BoxIcon,
  CalendarIcon,
  HomeIcon,
  MusicIcon,
  SettingsIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SidebarMenu = () => {
  const { isSidebarOpen } = useSidebar();
  return (
    <div className="flex flex-col gap-4 py-5">
      {contents.map((content) => (
        <Button
          key={content.label}
          className="justify-start gap-4"
          size="sm"
          variant="ghost"
        >
          <content.icon className="size-4 shrink-0" />
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.p
                key="label"
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', duration: 0.4 }}
                className="whitespace-nowrap"
              >
                {content.label}
              </motion.p>
            )}
          </AnimatePresence>
        </Button>
      ))}
    </div>
  );
};

const contents = [
  { icon: HomeIcon, label: 'Home' },
  { icon: CalendarIcon, label: 'Schedule Profile' },
  { icon: MusicIcon, label: 'Sounds' },
  { icon: SettingsIcon, label: 'Settings' },
  { icon: BoxIcon, label: 'Extensions' },
];
