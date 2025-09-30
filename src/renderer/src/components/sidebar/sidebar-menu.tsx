import { parentRoutes } from '../../lib/constants';
import { buttonVariants } from '../ui/button/button-variants';
import { useSidebar } from './hooks/use-sidebar';
import { motion, AnimatePresence } from 'motion/react';
import { NavLink } from 'react-router';
import { fadeInOut } from '../../lib/animations';

export const SidebarMenu = () => {
  const { isSidebarOpen } = useSidebar();
  return (
    <div className="flex flex-col gap-4 py-6">
      {parentRoutes.map((route) => (
        <NavLink
          className={({ isActive }) =>
            buttonVariants({
              size: 'sm',
              variant: isActive ? 'outline' : 'ghost',
              className: 'justify-start gap-4',
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
          </AnimatePresence>
        </NavLink>
      ))}
    </div>
  );
};