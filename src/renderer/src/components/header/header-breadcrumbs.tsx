import { breadcrumbItem } from '../../lib/animations';
import { parentRoutes } from '../../lib/constants';
import { buttonVariants } from '../ui/button/button-variants';
import { useBreadcrumbs } from './hooks/use-breadcrumbs';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';

export const HeaderBreadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs(parentRoutes);
  return (
    <div className="flex items-center gap-1 -ml-2">
      <AnimatePresence mode="popLayout">
        {breadcrumbs.map((crumb, index) => (
          <motion.div
            key={crumb.href}
            variants={breadcrumbItem}
            initial="initial"
            animate="animate"
            exit="exit"
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
        ))}
      </AnimatePresence>
    </div>
  );
};
