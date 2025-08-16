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
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            himes
          </motion.span>
        )}
      </AnimatePresence>
    </h1>
  );
};
