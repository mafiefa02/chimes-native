export const sidebarCollapse = ({ expanded }: { expanded: boolean }) => ({
  initial: false,
  animate: { width: expanded ? 240 : 80 },
  transition: { type: 'spring', stiffness: 300, damping: 30 },
});
