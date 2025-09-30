import { breadcrumbItem } from '../../lib/animations';
import { useSidebar } from './hooks/use-sidebar';
import { motion, AnimatePresence } from 'motion/react';

export const SidebarLogo = () => {
  const { isSidebarOpen } = useSidebar();
  return (
    <h1 className="px-3 py-4 text-xl font-bold">
      C
      <AnimatePresence initial={false}>
        {isSidebarOpen && (
          <motion.span
            variants={breadcrumbItem}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            himes
          </motion.span>
        )}
      </AnimatePresence>
    </h1>
  );
};
