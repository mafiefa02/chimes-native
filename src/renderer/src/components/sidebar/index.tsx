import { motion } from 'motion/react';
import { SidebarLogo } from './sidebar-logo';
import { SidebarMenu } from './sidebar-menu';
import { SidebarAction } from './sidebar-action';
import { SidebarToggle } from './sidebar-toggle';
import { useSidebar } from './hooks/use-sidebar';

export const Sidebar = () => {
  const { isSidebarOpen } = useSidebar();
  return (
    <motion.nav
      initial={false}
      animate={{ width: isSidebarOpen ? '240px' : '80px' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="relative grid grid-rows-[auto_1fr_auto] overflow-hidden bg-zinc-50 px-6 pb-4"
    >
      <SidebarLogo />
      <SidebarMenu />
      <SidebarAction />
      <SidebarToggle />
    </motion.nav>
  );
};
