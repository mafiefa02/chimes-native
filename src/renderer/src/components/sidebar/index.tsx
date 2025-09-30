import { useSidebar } from './hooks/use-sidebar';
import { SidebarAction } from './sidebar-action';
import { SidebarLogo } from './sidebar-logo';
import { SidebarMenu } from './sidebar-menu';
import { SidebarToggle } from './sidebar-toggle';
import { motion } from 'motion/react';
import { sidebar } from '../../lib/animations';

export const Sidebar = () => {
  const { isSidebarOpen, isSmallScreen } = useSidebar();
  return (
    <motion.nav
      initial={false}
      variants={sidebar}
      animate={isSidebarOpen ? 'open' : 'closed'}
      className="relative grid grid-rows-[auto_1fr_auto] overflow-hidden bg-zinc-50 px-6 pb-4"
    >
      <SidebarLogo />
      <SidebarMenu />
      <SidebarAction />
      {!isSmallScreen && <SidebarToggle />}
    </motion.nav>
  );
};