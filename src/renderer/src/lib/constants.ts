import { RouteNode } from './types';
import { CalendarIcon, HomeIcon, MusicIcon, SettingsIcon } from 'lucide-react';

export const parentRoutes: RouteNode[] = [
  { icon: HomeIcon, href: '/', label: 'Home' },
  { icon: CalendarIcon, href: '/schedule-profile', label: 'Schedule Profile' },
  { icon: MusicIcon, href: '/sounds', label: 'Sounds' },
  { icon: SettingsIcon, href: '/settings', label: 'Settings' },
];
