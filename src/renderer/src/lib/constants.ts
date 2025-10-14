import { RouteNode } from './types';
import { CalendarIcon, HomeIcon } from 'lucide-react';

export const ISO_DAY_OF_WEEKS = Array.from({ length: 7 }, (_, i) => i + 1);
export const IS_SERVER = typeof window === 'undefined';
export const parentRoutes: RouteNode[] = [
  { icon: HomeIcon, href: '/', label: 'Daily Schedule' },
  { icon: CalendarIcon, href: '/schedule-profile', label: 'Schedule Profile' },
  // { icon: MusicIcon, href: '/sounds', label: 'Sounds' },
  // { icon: SettingsIcon, href: '/settings', label: 'Settings' },
];
