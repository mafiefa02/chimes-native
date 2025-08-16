import { cn } from '@/lib/utils';
import { HTMLProps } from 'react';

interface InsetShadowCardProps extends HTMLProps<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const InsetShadowCard = ({
  className,
  children,
  ...props
}: Readonly<InsetShadowCardProps>) => {
  return (
    <div
      {...props}
      className={cn(
        'border inset-shadow-primary-50 inset-shadow-sm rounded-xl p-8 bg-zinc-50',
        className,
      )}
    >
      {children}
    </div>
  );
};
