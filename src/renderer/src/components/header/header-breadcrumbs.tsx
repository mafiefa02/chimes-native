import { parentRoutes } from '../../lib/constants';
import { buttonVariants } from '../../lib/utils';
import { useBreadcrumbs } from './hooks/use-breadcrumbs';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';

export const HeaderBreadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs(parentRoutes);
  return (
    <div className="flex items-center gap-1 -ml-2">
      {breadcrumbs.map((crumb, index) => (
        <AnimatePresence key={crumb.href}>
          <motion.div
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
          >
            <Link
              to={crumb.href}
              className={buttonVariants({
                size: 'sm',
                variant: 'outline',
                className: [
                  'flex items-center gap-2 text-sm transition',
                  index === 0 && 'rounded-l-md',
                  index !== breadcrumbs.length && 'rounded-none',
                  index === breadcrumbs.length - 1 && 'rounded-r-md',
                ],
              })}
            >
              <crumb.icon className="size-4" />
              <p>{crumb.label}</p>
            </Link>
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  );
};
