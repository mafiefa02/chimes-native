import { cn } from '../lib/utils';
import { HTMLProps } from 'react';

interface PageLayoutProps extends HTMLProps<HTMLDivElement> {}

export const PageLayout = ({ children, className }: PageLayoutProps) => {
  return (
    <div
      className={cn(
        'grid grid-rows-[auto_1fr] h-[calc(100dvh-var(--header-height)-var(--main-vertical-padding))] gap-6',
        className,
      )}
    >
      {children}
    </div>
  );
};
