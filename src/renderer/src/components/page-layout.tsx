import { cn } from '../lib/utils';
import { HTMLProps } from 'react';

interface PageLayoutProps extends HTMLProps<HTMLDivElement> {}

export const PageLayout = ({ children, className }: PageLayoutProps) => {
  return (
    <div className={cn('grid grid-rows-[auto_1fr] gap-6 h-full', className)}>
      {children}
    </div>
  );
};
