import { cn } from '@/lib/utils';
import { HTMLProps } from 'react';

interface PageHeaderProps extends HTMLProps<HTMLDivElement> {}

export const PageHeader = ({
  children,
  className,
  ...props
}: PageHeaderProps) => {
  return (
    <div
      {...props}
      className={cn('flex items-center gap-4 justify-between', className)}
    >
      {children}
    </div>
  );
};
