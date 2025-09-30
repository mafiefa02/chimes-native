import { useIsMac } from '../../hooks/use-is-mac';
import { fadeInOut } from '../../lib/animations';
import { parentRoutes } from '../../lib/constants';
import { KbdIndicator } from '../kbd-indicator';
import { buttonVariants } from '../ui/button/button-variants';
import { useSidebar } from './hooks/use-sidebar';
import { useSidebarShortcuts } from './hooks/use-sidebar-shortcuts';
import { motion, AnimatePresence } from 'motion/react';
import { NavLink } from 'react-router';

export const SidebarMenu = () => {
  const { isSidebarOpen } = useSidebar();
  useSidebarShortcuts();
  const isMac = useIsMac();
  return (
    <div className="flex flex-col gap-4 py-6">
      {parentRoutes.map((route, index) => (
        <NavLink
          className={({ isActive }) =>
            buttonVariants({
              size: 'sm',
              variant: isActive ? 'outline' : 'ghost',
              className: 'justify-start gap-4 relative',
            })
          }
          key={route.label}
          to={route.href}
        >
          <route.icon className="size-4 shrink-0" />
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.p
                key="label"
                variants={fadeInOut}
                initial="initial"
                animate="animate"
                exit="exit"
                className="whitespace-nowrap"
              >
                {route.label}
              </motion.p>
            )}
            {isSidebarOpen && (
              <KbdIndicator className="absolute right-4">
                {isMac ? '⌘' : 'CTRL'} + {index + 1}
              </KbdIndicator>
            )}
          </AnimatePresence>
        </NavLink>
      ))}
    </div>
  );
};
